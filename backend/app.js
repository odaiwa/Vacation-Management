global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const uploader = require("express-fileupload");
const cors = require("cors");
const usersController = require("./controllers-layer/users-controller");
const authController = require("./controllers-layer/auth-controller");
const followsController = require("./controllers-layer/follows-controller");
const vacationsController = require("./controllers-layer/vacations-controllers");
const sanitize = require("./middleware/sanitize");
const path = require("path");
const socketLogic = require("./business-logic-layer/vacation-socket-logic");
const server = express();



server.use(sanitize);
const options={
    origin:true,
    credentials:true,
    allowedHeaders:"Origin, X-Requested-With, Content-Type, Accept, Authorization"
}
server.use(cors(options));
server.use(uploader());
server.use(express.json());

server.use(express.static(path.join(__dirname,"./build")));

server.use("/api/users", usersController);
server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/follows", followsController);


server.use("*", (request,response)=> {
    response.sendFile(path.join(__dirname, "./build/index.html"))
});



server.use("*", (request, response) => {
    response.status(404).send("Route not found.");
});

const port = process.env.PORT || 3001; 
const listener = server.listen(port, () => console.log(`Listening to ${port}...`));
socketLogic.start(listener);
