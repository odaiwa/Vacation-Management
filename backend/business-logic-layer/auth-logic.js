//Authintication-logic
const dal = require("../data-access-layer/dal");
const uuid = require("uuid");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/UserModel");
const jwtHelper = require("../helpers/jwt-helper");


//check if username already exists in DB
async function usernameAlreadyTakenAsync(username) {
    const sql = `SELECT username FROM users WHERE username = ?`;
    const result = await dal.executeAsync(sql, [username]);
    if (result.length > 0) return null;
}

//Register new user to system
async function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    user.uuid = uuid.v4();
    const sql = "INSERT INTO users VALUES (DEFAULT ,? , ?, ?, ?, ?,0)";
    const values = [user.uuid, user.firstName, user.lastName, user.username, user.password];
    const info = await dal.executeAsync(sql, values);
    delete user.password;
    //user.isAdmin = 0;
    user.token = jwtHelper.getNewToken(user);
    return user;
}

//Login to system
async function loginAsync(userToLogIn) {
    userToLogIn.password = cryptoHelper.hash(userToLogIn.password);
    const sql = "SELECT uuid ,firstName, lastName, username, password, isAdmin FROM users WHERE username = ? AND password = ?";
    const values = [userToLogIn.username, userToLogIn.password];
    const users = await dal.executeAsync(sql, values);
    if (users.length === 0) return null;
    const user = users[0];
    user.token = jwtHelper.getNewToken(user);
    return user;
}


module.exports = {
    usernameAlreadyTakenAsync,
    registerAsync,
    loginAsync
};