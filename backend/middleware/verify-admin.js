const jwt = require("jsonwebtoken");

function verifyLoggedIn(request, response, next) {
    if (!request.headers.authorization)
        return response.status(401).send("You are not logged in!");
        
    // extract exact token
    const token = request.headers.authorization.split(" ")[1];

    if (!token)
        return response.status(401).send("You are not logged in!");

    jwt.verify(token, config.jwtKey, (err, payload) => { // payload.user is the user object
        if (err && err.message === "jwt expired")
            return response.status(403).send("Your login session has expired.");
        if (err)
            return response.status(401).send("You are not logged in!");
        const user = payload;
        if(!user.payload.isAdmin || user.payload.isAdmin !== 1) return response.status(403).send("You are not authorized.");

        next();
    });
}

module.exports = verifyLoggedIn;
