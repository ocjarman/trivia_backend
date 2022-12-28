const express = require("express");
const app = express();
const path = require("path");
const volleyball = require("volleyball");
// const { addUser, removeUser, getUser, getUsersInRoom } = require("./User");
const RoomManager = require("./Data/RoomManager");
const RoomClass = require("./Data/RoomClass");
const questions = require("../questions");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const roomManager = new RoomManager();

// need cors to make connection with frontend
app.use(cors());

const server = http.createServer(app);

// allows us to work with socket.io
const io = new Server(server, {
  cors: {
    // this is the origin of the REACT app
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// Set up middleware
app.use(volleyball);
app.use(express.json());

// Set up routes
// app.use("/api", require("./api"));

// when someone goes to connect to server thru client, this will start running
io.on("connection", (socket) => {
  // socket id is player id
  console.log(`Player is connected: ${socket.id}`);

  socket.on("join_room", ({ name, roomId }) => {
    let roomInstance = roomManager.findRoom(roomId);
    let userJoiningRoom;

    if (roomInstance) {
      // if (roomInstance.validateUsername(name) === true) {
      const { user } = roomInstance.addUser({ id: socket.id, name, roomId });
      console.log({ user });
      userJoiningRoom = user;
      // } else {
      //   console.log("that username is taken");
      // }
    } else {
      console.log("creating new room");
      roomInstance = roomManager.createRoom(
        { id: socket.id, name, roomId },
        roomId
      );
      userJoiningRoom = roomInstance.getUser(socket.id);
    }

    // message from server to client
    socket.emit("message", {
      user: "admin",
      text: `${userJoiningRoom.name}, welcome to room ${userJoiningRoom.roomId}.`,
    });

    // message from server to client
    socket.broadcast.to(userJoiningRoom.roomId).emit("message", {
      user: "admin",
      text: `${userJoiningRoom.name}, has joined`,
    });

    socket.join(userJoiningRoom.roomId);

    // not updating here but should update room data when someone leaves
    io.to(roomInstance.roomId).emit("roomData", {
      roomId: roomInstance.roomId,
      users: roomInstance.getAllUsers(),
    });
  });

  socket.on("send_message", (message) => {
    let roomInstance = roomManager.getRoomBySocketId(socket.id);
    const foundUser = roomInstance.getUser(socket.id);

    // 'message' is to the client, 'send message' is to the server
    io.to(roomInstance.roomId).emit("message", {
      user: foundUser,
      text: message,
    });

    // on every message sent, update room data. this includes when admin says someone has joined/left

    io.to(roomInstance.roomId).emit("roomData", {
      roomId: roomInstance.roomId,
      users: roomInstance.getAllUsers(),
    });
  });

  socket.on("startGame", () => {
    console.log("starting game");
    let roomInstance = roomManager.getRoomBySocketId(socket.id);
    let usersInRoom = roomInstance.getAllUsers();
    if (usersInRoom.length > 1) {
      //emit to all that the game is going to begin in 1 minute, set timer
      socket.broadcast.to(roomInstance.roomId).emit("otherPlayerStartedGame");
      io.to(roomInstance.roomId).emit("gameStarted", {
        questions,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("in disconnect");
    let roomInstance = roomManager.getRoomBySocketId(socket.id);

    // backend was breaking if refreshing on home page bc theres no room instance to get the user from
    if (roomInstance !== undefined) {
      const foundUser = roomInstance.getUser(socket.id);
      if (foundUser) {
        io.to(roomInstance.roomId).emit("message", {
          user: "admin",
          text: `${foundUser.name} has left`,
        });
        roomInstance.removeUser(socket.id);

        // must send rooom data after user is removed to update list on frontend
        io.to(roomInstance.roomId).emit("roomData", {
          roomId: roomInstance.roomId,
          users: roomInstance.getAllUsers(),
        });
      } else {
        console.log("user of socket id does not exist", socket.id);
      }
    } else {
      console.log("user is not in a room");
    }
  });
});

server.listen(4000, () => {
  console.log("server is running");
});

module.exports = server;
