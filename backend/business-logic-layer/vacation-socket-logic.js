
const io = require("socket.io");

let socketsManager;

function start(listener) {

    // Connect once to socket.io library:
    socketsManager = io(listener, { cors: { origin: "http://localhost:3000" } });
    // Listen to any client connection: 
    socketsManager.sockets.on("connection", socket => {
        console.log("client connected.");
        socket.on("disconnect", () => {
            console.log("client disconnect.");
        });

        socket.on("add-vacation-from-client", addedVacation => {
            socketsManager.sockets.emit("add-vacation-from-server", addedVacation);
        });

        socket.on("update-vacation-from-client", updatedVacation => {
            socketsManager.sockets.emit("update-vacation-from-server", updatedVacation);
        });

        socket.on("delete-vacation-from-client", deletedVacation => {
            socketsManager.sockets.emit("delete-vacation-from-server", deletedVacation);
        });
    });
}

module.exports = {
    start
};
