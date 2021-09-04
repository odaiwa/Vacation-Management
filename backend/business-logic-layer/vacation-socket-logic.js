
  const io = require("socket.io");

  let socketsManager;
  
  function start(listener) {
  
      // Connect once to socket.io library:
      socketsManager = io(listener, { cors: { origin: "http://localhost:3000" } });  
      // Listen to any client connection: 
      socketsManager.sockets.on("connection", socket => {
          console.log("One client has been connected.");
          socket.on("disconnect", () => {
              console.log("One client disconnect.");
          });
  
          socket.on("added-vacation-from-client", addedVacation => {
              socketsManager.sockets.emit("added-vacation-from-server", addedVacation);
          });

          socket.on("updated-vacation-from-client", updatedVacation => {
              socketsManager.sockets.emit("updated-vacation-from-server", updatedVacation);
          });

          socket.on("deleted-vacation-from-client", deletedVacation => {
              socketsManager.sockets.emit("deleted-vacation-from-server", deletedVacation);
          });
      });
  }
  
  module.exports = {
      start
  };
  