async function getTopScores(db) {
    const topWins=await db.collection("users").find({},{projection:{userName:1,highestScore:1}}).sort({highestScore:-1,wins:-1}).limit(10).toArray();
    return topWins;
}

module.exports={getTopScores};