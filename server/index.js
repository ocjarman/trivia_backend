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

    let newQuestions = generateNewQuestions(questions);
    roomInstance.setGameQuestions(newQuestions);

    let scoreStorage = roomInstance.getFinalScores();
    if (scoreStorage.length > 0) {
      scoreStorage = roomInstance.clearScores();
    }

    console.log({ scoreStorage });

    roomInstance.setGameStatus("started");
    let randomizedQuestions = roomInstance.getGameQuestions();
    console.log({ randomizedQuestions });
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
      setTimeout(nextQuestion, 3000);
      setTimeout(nextQuestion, 6000);
      setTimeout(nextQuestion, 9000);
      setTimeout(nextQuestion, 12000);
      setTimeout(nextQuestion, 15000);
    };

    const nextQuestion = () => {
      console.log("going to next q");
      io.to(roomInstance.roomId).emit("navigatingToNextQ");
    };

    // set a timer for 10 seconds, and then set the game status to in progress
    setTimeout(gameInProgress, 5000); /**this will change to 10 seconds */

    const gameOver = () => {
      console.log("game is over");
      roomInstance.setGameStatus("results");
      const allUsers = roomInstance.getAllUsers();

      allUsers.forEach((user) => {
        let previouslyAnswered = roomInstance.getUserAnswers(user.id);
        const finalScore = previouslyAnswered.reduce(
          (sum, nextItem) => (sum += nextItem.score),
          0
        );
        console.log(previouslyAnswered);
        // setting users individual game score, sending it to allscores
        roomInstance.setFinalScores({
          user: user.name,
          score: finalScore,
        });
      });
      let allGameScores = roomInstance.getFinalScores();

      let gameStatus = roomInstance.getGameStatus();
      console.log(gameStatus);

      socket.broadcast
        .to(roomInstance.roomId)
        .emit("gameStatus", { gameStatus, allGameScores });

      io.to(roomInstance.roomId).emit("gameStatus", {
        gameStatus,
        allGameScores,
      });
    };

    setTimeout(gameOver, 20000); /**this will change to 60 seconds */
  });

  socket.on("sendAnswer", (data) => {
    let roomInstance = roomManager.getRoomBySocketId(socket.id);
    let questions = roomInstance.getGameQuestions();

    let user = roomInstance.getUser(socket.id);
    // find the question we're checking the answer for
    let currentQuestion = questions.filter(
      (question) => question.id === data.questionId
    );

    let previouslyAnswered = roomInstance.getUserAnswers(user.id);

    let found = previouslyAnswered.find((question) => {
      return question.questionId === data.questionId;
    });

    const checkScore = () => {
      let score;
      if (currentQuestion[0].correct_answer === data.selectedAnswer) {
        score = 1;
      } else {
        score = 0;
      }
      return score;
    };

    if (found !== undefined) {
      if (found.answer !== data.selectedAnswer) {
        found.answer = data.selectedAnswer;
        found.score = checkScore();
      }
    } else {
      roomInstance.setUserAnswers(
        user.id,
        currentQuestion[0],
        data.selectedAnswer,
        checkScore()
      );
    }
  });

  socket.on("resetGame", () => {
    console.log("RESETTING GAME");
    let roomInstance = roomManager.getRoomBySocketId(socket.id);
    roomInstance.setGameStatus("ready");
    const gameStatus = roomInstance.getGameStatus();

    socket.broadcast.to(roomInstance.roomId).emit("gameStatus", { gameStatus });

    io.to(roomInstance.roomId).emit("gameStatus", {
      gameStatus,
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
