async function updateStats(db,id,win,score,socketId)
{
                if(win)
                {
                    await db.collection("users").updateOne(
                        {userId : id},
                        {
                            $inc: { matchesPlayed: 1, wins: 1 },
                            $max: { highestScore: socketId===score.batter?score.currentScore:score.Target-1 },
                            $set: { updatedAt: new Date() }
                        }
                    );
                }

                else
                {
                    await db.collection("users").updateOne(
                        {userId : id},
                        {
                            $inc: { matchesPlayed: 1},
                            $max: { highestScore: socketId==score.batter?score.currentScore:score.Target-1 },
                            $set: { updatedAt: new Date() }
                        }
                    );
                }
}

module.exports={updateStats};