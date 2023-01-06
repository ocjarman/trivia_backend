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
app.use("/api", require("./api"));

const generateNewQuestions = (arrayOfQuestions) => {
  let randomizedQuestions = [];
  let q1 = Math.floor(Math.random() * arrayOfQuestions.length);
  let q2 = Math.floor(Math.random() * arrayOfQuestions.length);
  let q3 = Math.floor(Math.random() * arrayOfQuestions.length);
  let q4 = Math.floor(Math.random() * arrayOfQuestions.length);
  let q5 = Math.floor(Math.random() * arrayOfQuestions.length);
  randomizedQuestions.push(
    arrayOfQuestions[q1],
    arrayOfQuestions[q2],
    arrayOfQuestions[q3],
    arrayOfQuestions[q4],
    arrayOfQuestions[q5]
  );
  return randomizedQuestions;
};

// when someone goes to connect to server thru client, this will start running
io.on("connection", (socket) => {
  // socket id is player id
  console.log(`Player is connected: ${socket.id}`);

  socket.on("join_room", ({ name, roomId }) => {
    let roomInstance = roomManager.findRoom(roomId);
    let userJoiningRoom;

    if (roomInstance) {
      const gameStatus = roomInstance.getGameStatus();
      const { user } = roomInstance.addUser({ id: socket.id, name, roomId });
      // will need this for implementing user waiting room while other players finish game
      socket.emit("gameStatus", { gameStatus });
      userJoiningRoom = user;
    } else {
      console.log("creating new room");
      roomInstance = roomManager.createRoom(
        { id: socket.id, name, roomId },
        roomId
      );
      roomInstance.setGameStatus("ready");
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
      text: `${userJoiningRoom.name} has joined`,
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

  // ---once game has started, hit this listener and begin comm---
  socket.on("startGame", () => {
    console.log("starting game");
    let roomInstance = roomManager.getRoomBySocketId(socket.id);
    let randomizedQuestions = generateNewQuestions(questions);
    let scoreStorage = roomInstance.getAllScores();
    if (scoreStorage.length > 0) {
      roomInstance.clearScores();
    }

    console.log(scoreStorage);

    roomInstance.setGameStatus("started");
    let gameStatus = roomInstance.getGameStatus();
    socket.broadcast
      .to(roomInstance.roomId)
      .emit("gameStatus", { gameStatus, randomizedQuestions });
    io.to(roomInstance.roomId).emit("gameStatus", {
      gameStatus,
      randomizedQuestions,
    });

    const gameInProgress = () => {
      console.log("game in progress");
      roomInstance.setGameStatus("in progress");
      let gameStatus = roomInstance.getGameStatus();
      socket.broadcast
        .to(roomInstance.roomId)
        .emit("gameStatus", { gameStatus });

      io.to(roomInstance.roomId).emit("gameStatus", {
        gameStatus,
      });
    };

    // set a timer for 10 seconds, and then set the game status to in progress
    setTimeout(gameInProgress, 5000); /**this will change to 10 seconds */

    const gameOver = () => {
      console.log("game is over");
      roomInstance.setGameStatus("results");
    };

    setTimeout(gameOver, 20000); /**this will change to 60 seconds */
  });

  socket.on("sendingGameResults", (data) => {
    let roomInstance = roomManager.getRoomBySocketId(socket.id);
    console.log(data);
    roomInstance.setGameScore(data);
    const newResults = roomInstance.getAllScores();
    const users = roomInstance.getAllUsers();

    if (users.length === newResults.length) {
      roomInstance.setGameStatus("results");
      const gameStatus = roomInstance.getGameStatus();

      socket.broadcast
        .to(roomInstance.roomId)
        .emit("gameStatus", { gameStatus, newResults });

      io.to(roomInstance.roomId).emit("gameStatus", {
        gameStatus,
        newResults,
      });
    }
  });

  socket.on("resetGame", () => {
    let roomInstance = roomManager.getRoomBySocketId(socket.id);
    const previousResults = roomInstance.getAllScores();
    roomInstance.setGameStatus("ready");
    const gameStatus = roomInstance.getGameStatus();

    socket.broadcast
      .to(roomInstance.roomId)
      .emit("gameStatus", { gameStatus, previousResults });

    io.to(roomInstance.roomId).emit("gameStatus", {
      gameStatus,
      previousResults,
    });
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

server.listen(process.env.PORT || 4000, () => {
  console.log("server is running");
});

module.exports = server;
