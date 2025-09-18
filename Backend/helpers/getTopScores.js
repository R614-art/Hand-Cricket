async function getTopScores(db) {
    const topWins=await db.collection("users").find({},{projection:{userName:1,wins:1}}).sort({score:-1,wins:-1}).limit(10).toArray();
    return topWins;
}

module.exports={getTopScores};