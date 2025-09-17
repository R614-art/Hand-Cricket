async function getProfile(db,userId) {
    const profile = await db.collection("users").findOne({userId:userId});
    return profile;
}

module.exports = {getProfile};