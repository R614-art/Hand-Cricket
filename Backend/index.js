const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors= require('cors');
const {MongoClient} = require('mongodb');
const {ensureUserProfile}= require('./helpers/ensureProfile')
const {updateStats}=require('./helpers/updateStats');
const {getProfile}=require('./helpers/getProfile');
const {requireAuth,clerkClient}= require('@clerk/express');
const { getTopWins } = require("./helpers/getTopWins");
const { getTopScores } = require("./helpers/getTopScores");
dotenv.config()

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db("Cluster0");
    server.listen(15000, () => {
      console.log("Server listening on port 15000");
    });
  } catch (err) {
    console.error("Mongo connection error:", err);
    process.exit(1);
  }
}

startServer();
app.use(express.json())
app.use(cors({
  origin: "https://hand-cricket-rho.vercel.app",
  methods: ["GET", "POST"],
}));

app.get('/ping',(req,res)=>{
    res.status(200).send('connected');
})

app.get('/getprofile',requireAuth(),async (req,res)=>{
    console.log('requested')
    const {userId}=req.auth();
    //console.log(userId);
    const user=await clerkClient.users.getUser(userId);
    const userName= user.fullName;
    ensureUserProfile(db,userId,userName)
    const profile= await getProfile(db,userId);
    //console.log(profile);
    res.json(profile);
})

app.get('/getleaderboard',requireAuth(),async (req,res)=>{
    const wins=await getTopWins(db);
    const scores= await getTopScores(db);
    res.json({wins:wins,scores:scores})
})

const io = new Server(server, {
    pingTimeout: 30000,
    pingInterval: 5000,
    cors: {
    origin: ["https://hand-cricket-rho.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

let waitingPlayer = null;
const games = new Map();
const playerRoom = new Map();
const socketUser = new Map();

io.on("connection", (socket) => {
    socket.on("registerUser", ({ userId,userName }) => {
        socketUser.set(socket.id, userId);
        ensureUserProfile(db,userId,userName);
    });
    socket.on('quickPlay',()=>{
            if (waitingPlayer) {
            const roomId = `${socket.id}-${waitingPlayer.id}`;
            socket.join(roomId);
            waitingPlayer.join(roomId);

            io.to(socket.id).emit("role", "bowling");
            io.to(waitingPlayer.id).emit("role", "batting");

            const score = {
                roomId,
                batter: waitingPlayer.id,
                bowler: socket.id,
                currentScore: 0,
                Target: null,
                win: null,
                batterMove: null,
                bowlerMove: null,
                out: '',
                ready: new Set()
            };

            games.set(roomId, score);
            playerRoom.set(socket.id, roomId);
            playerRoom.set(waitingPlayer.id, roomId);

            io.to(roomId).emit("startgame", roomId);
            waitingPlayer = null;
        } else {
            waitingPlayer = socket;
        }
    })
    socket.on("createRoom", () => {
        const roomId = Math.random().toString(36).substring(2, 8);
        socket.join(roomId);

        games.set(roomId, {
            roomId,
            batter: socket.id,
            bowler: null,
            currentScore: 0,
            Target: null,
            win: null,
            batterMove: null,
            bowlerMove: null,
            out: '',
            ready: new Set(),
            stats:false
        });
        playerRoom.set(socket.id, roomId);

        socket.emit("roomCreated", roomId);
    });

    socket.on("joinRoom", (roomId) => {
        const score = games.get(roomId);
        if (!score || score.bowler) {
            socket.emit("joinError", "Room not available");
            return;
        }

        socket.join(roomId);
        score.bowler = socket.id;
        playerRoom.set(socket.id, roomId);

        io.to(score.batter).emit("role", "batting");
        io.to(score.bowler).emit("role", "bowling");
        io.to(roomId).emit("startgame", roomId);
    });

    socket.on('PlayerMove', async (number) => {
        const roomId = playerRoom.get(socket.id);
        const score = games.get(roomId);
        if (!score) return;

        if (socket.id === score.batter) {
            score.batterMove = parseInt(number);
        } else {
            score.bowlerMove = parseInt(number);
        }

        if (score.bowlerMove !== null && score.batterMove !== null) {
            if (score.bowlerMove !== score.batterMove) {
                score.currentScore += score.batterMove;
                score.out='';
                if (score.Target !== null && score.currentScore >= score.Target) {
                    score.win = score.batter;
                }
                io.to(roomId).emit('ballResult', JSON.stringify(score));
            } else {
                if (!score.Target) {
                    score.Target = score.currentScore+1;
                    score.currentScore = 0;
                    score.out=score.batter;
                    [score.batter, score.bowler] = [score.bowler, score.batter];
                    io.to(score.batter).emit("roleSwap", "batting");
                    io.to(score.bowler).emit("roleSwap", "bowling");
                } else {
                    if (score.currentScore < score.Target) {
                        score.win = score.bowler;
                    }
                }
                io.to(roomId).emit("ballResult", JSON.stringify(score));
            }
            if(score.win && !score.stats){
                score.stats = true;

                const winnerSocket = score.win;
                const loserSocket = score.batter === winnerSocket ? score.bowler : score.batter;

                const winnerId = socketUser.get(winnerSocket);
                const loserId = socketUser.get(loserSocket);

                await updateStats(db, winnerId, true, score, winnerSocket);
                await updateStats(db, loserId, false, score, loserSocket);
            }
            score.batterMove = null;
            score.bowlerMove = null;
        }
    });

    socket.on("playAgain", () => {
        const roomId = playerRoom.get(socket.id);
        const score = games.get(roomId);
        if (!score) return;

        const opponentId = score.batter === socket.id ? score.bowler : score.batter;
        const opponentSocket = io.sockets.sockets.get(opponentId);

        if (!opponentSocket) {
            socket.emit("opponentLeft");
            return;
        }

        score.ready.add(socket.id);
        console.log(`${socket.id} wants a rematch`);

        if (score.ready.size === 2) {
            console.log(`Both players ready, restarting game in room: ${roomId}`);
            score.ready.clear();

            const newScore = {
                roomId,
                batter: score.bowler,
                bowler: score.batter,
                currentScore: 0,
                Target: null,
                win: null,
                batterMove: null,
                bowlerMove: null,
                out: '',
                ready: new Set(),
                stats:false
            };

            games.set(roomId, newScore);
            io.to(newScore.batter).emit("role", "batting");
            io.to(newScore.bowler).emit("role", "bowling");
            io.to(roomId).emit("startgame", roomId);
        }
    });

    socket.on("playAgainNew", () => {
        const oldRoom = playerRoom.get(socket.id);
        if (oldRoom) {
            socket.leave(oldRoom);
            playerRoom.delete(socket.id);
        }

        const score = games.get(oldRoom);
        if (score) {
            const opponentId = score.batter === socket.id ? score.bowler : score.batter;
            if(score.win===null)
            {
                io.to(opponentId).emit("opponentLeft");
            }
            else
            {
                io.to(opponentId).emit("opponentLeftAfter");
            }
            playerRoom.delete(opponentId);
            games.delete(oldRoom);
        }

        if (waitingPlayer) {
            const roomId = `${socket.id}-${waitingPlayer.id}`;
            socket.join(roomId);
            waitingPlayer.join(roomId);

            const score = {
                roomId,
                batter: waitingPlayer.id,
                bowler: socket.id,
                currentScore: 0,
                Target: null,
                win: null,
                batterMove: null,
                bowlerMove: null,
                out: null,
                ready: new Set(),
                stats:false
            };

            games.set(roomId, score);
            playerRoom.set(socket.id, roomId);
            playerRoom.set(waitingPlayer.id, roomId);
            io.to(socket.id).emit("role", "bowling");
            io.to(waitingPlayer.id).emit("role", "batting");
            io.to(roomId).emit("startgame", roomId);
            waitingPlayer = null;
        } else {
            waitingPlayer = socket;
        }
    });

    socket.on("disconnect", () => {
        const roomId = playerRoom.get(socket.id);
        if (roomId) {
            socket.leave(roomId);
            const score = games.get(roomId);
            
            if (score) {
                const opponentId = score.batter === socket.id ? score.bowler : score.batter;
                if (opponentId) {
                    const opponentSocket = io.sockets.sockets.get(opponentId);
                    if (opponentSocket) {
                        opponentSocket.leave(roomId); // force opponent out
                        io.to(opponentId).emit("opponentLeft");
                    }
                    playerRoom.delete(opponentId);
                    score.ready.delete(opponentId);
                }
                score.ready.delete(socket.id);
                games.delete(roomId);
            }
            playerRoom.delete(socket.id);
        }

        if (waitingPlayer && waitingPlayer.id === socket.id) {
            waitingPlayer = null;
        }

        console.log(`User disconnected: ${socket.id}`);
    });
});
