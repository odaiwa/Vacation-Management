global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const uploader = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser')
const usersController = require("./controllers-layer/users-controller");
const authController = require("./controllers-layer/auth-controller");
const followsController = require("./controllers-layer/follows-controller");
const vacationsController = require("./controllers-layer/vacations-controllers");
const sanitize = require("./middleware/sanitize");
const socketLogic = require("./business-logic-layer/vacation-socket-logic");
const server = express();


// server.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// });
server.use(sanitize);
// server.use(express.json());
const options={
    origin:true,
    credentials:true,
    allowedHeaders:"Origin, X-Requested-With, Content-Type, Accept, Authorization"
}
// server.use(bodyParser.json())
server.use(cors(options));
server.use(uploader());
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
socketLogic.start(listener);