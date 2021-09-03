global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json"); // get in which env project running
const express = require("express");
const cors = require("cors");
const usersController = require("./controllers-layer/users-controller");
const authController = require("./controllers-layer/auth-controller");
const server = express();


server.use(cors());
// Handle json body object so request.body will contain the json in the body:
server.use(express.json());
server.use("/api/users", usersController);
server.use("/api/auth", authController);

// Any non existing route (must be last):
server.use("*", (request, response) => {
    response.status(404).send("Route not found.");
});

const port = 3001;
const listener = server.listen(port, () => console.log(`Listening on port ${port}`));
