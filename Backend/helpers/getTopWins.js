async function getTopWins(db) {
    const topWins=await db.collection("users").find({},{projection:{userName:1,wins:1}}).sort({wins:-1,score:-1}).limit(10).toArray();
    return topWins;
}

module.exports={getTopWins};