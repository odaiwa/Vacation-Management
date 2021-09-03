//Follows Logic
const dal = require("../data-access-layer/dal");

//Get All Follows (UsedId and Vacation Id)
async function getAllFollowsAsync() {
    const sql = `SELECT * FROM follows`;
    const followers = await dal.executeAsync(sql);
    return followers;
}


//Get number of followers for each vacation (destination, vacationId, number of followers)
async function getCountOfUsersFollowingAsync() {
    const sql = "SELECT vacations.destination, vacations.vacationId, COUNT(userId) AS numberOfUsers FROM follows JOIN vacations on vacations.vacationId = follows.vacationId  GROUP BY vacations.vacationId";
    const countFollowers = await dal.executeAsync(sql);
    return countFollowers;
}

//Get follower by userId
//params : userId
async function getOneFollowerAsync(userId) {
    const sql = "SELECT * FROM follows WHERE userId = ? ";
    const followers = await dal.executeAsync(sql, [userId]);
    return followers;
}

//get followers by vacation and user IDs
//params : userId, vacationId
async function getOneFollowerByVacationIdAsync(userId, vacationId) {
    const sql = "SELECT * FROM follows WHERE userId = ? AND vacationId = ?";
    const followers = await dal.executeAsync(sql, [userId, vacationId]);
    if (followers.length === 0) return null;
    return followers;
}


//Get details of followers
//params : userId, vacationId
async function getAllDetailsOfFollowerAsync() {
    const sql = `SELECT follows.*, vacations.*, users.* FROM follows JOIN vacations
    ON vacations.vacationId = follows.vacationId JOIN users
    ON users.userId = follows.userId`;
    const followers = await dal.executeAsync(sql);
    return followers;
}

//delete follower from vacation
//params : userId, vacationId
async function deleteFollowerAsync(userId, vacationId) {
    const sql = `DELETE FROM follows WHERE userId = ? AND vacationId =?`;
    await dal.executeAsync(sql, [userId, vacationId]);
}

//add a follower to vacation 
//params : userId, vacationId
async function addFollowingToVacationAsync(userId, vacationId) {
    const sql = `INSERT INTO follows (userId, vacationId) VALUES( ?, ?)`;
    await dal.executeAsync(sql, [userId, vacationId]);
}

//get vacation followers by userId
async function getVacationsFollowersByUserIdAsync(id) {
    const sql = `SELECT follows.*, vacations.*, users.* FROM follows JOIN vacations
                ON vacations.vacationId = follows.vacationId JOIN users
                ON users.userId = follows.userId WHERE follows.userId = ?`;
    const following = await dal.executeAsync(sql, [id]);
    if (following.length === 0) return null;
    return following;
}

//get users by vacationId that they follow
async function getUsersByVacationIdAsync(id) {
    const sql =`SELECT vacations.*, users.* FROM follows JOIN vacations
                ON vacations.vacationId = follows.vacationId JOIN users
                ON users.userId = follows.userId WHERE follows.vacationId = ${id}`;
    const following = await dal.executeAsync(sql);
    if (following.length === 0) return null; 
    return following;
}

module.exports = {
    getAllFollowsAsync,
    getCountOfUsersFollowingAsync,
    getOneFollowerAsync,
    getOneFollowerByVacationIdAsync,
    getAllDetailsOfFollowerAsync,
    deleteFollowerAsync,
    addFollowingToVacationAsync,
    getVacationsFollowersByUserIdAsync,
    getUsersByVacationIdAsync
};
