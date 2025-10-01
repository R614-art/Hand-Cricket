async function ensureUserProfile(db,userId,userName) {
  const users = db.collection("users");
  const existing = await users.findOne({ userId : userId });
  if (!existing) {
    await users.insertOne({
      userId : userId,
      userName: userName,
      matchesPlayed: 0,
      wins: 0,
      highestScore: -1,
      createdAt: new Date(),
      updatedAt: new Date(),
      coins: 0
    });
  }
}

module.exports={ensureUserProfile};