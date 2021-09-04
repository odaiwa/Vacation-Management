global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const usersController = require("./controllers-layer/users-controller");
const authController = require("./controllers-layer/auth-controller");
const followsController = require("./controllers-layer/follows-controller");
const vacationsController = require("./controllers-layer/vacations-controllers");
const server = express();


server.use(cors());
server.use(express.json());

server.use("/api/users", usersController);
server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/follows", followsController);



server.use("*", (request, response) => {
    response.status(404).send("Route not found.");
});

const port = process.env.PORT || 3001; //process.env.PORT === Some production port || 3001 === localhost port
const listener = server.listen(port, () => console.log(`Listening to ${port}...`));
