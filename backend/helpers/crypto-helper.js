const crypto = require("crypto");
//hash the password with sha512 algorithm
function hash(plainText) {
    if(!plainText) return null;
    const salt = "YouCannotCrackPasswords";
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};