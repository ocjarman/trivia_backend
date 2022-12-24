const express = require("express");
const app = express();
const path = require("path");
const volleyball = require("volleyball");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./User");

const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

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

//sets up body for us when making post requests or any req that needs a body
// app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api", require("./api"));

// when someone goes to connect to server thru client, this will start running
io.on("connection", (socket) => {
  // socket id is player id
  console.log(`Player is connected: ${socket.id}`);

  socket.on("join_room", ({ name, room }) => {
    const { user } = addUser({ id: socket.id, name, room });
    console.log("line 40", user);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("send_message", (message) => {
    const user = getUser(socket.id);
    console.log("user in send message", user);
    io.to(user.room).emit("message", { user: user, text: message });
    console.log({ message });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} had left`,
      });
    }
  });
});

server.listen(4000, () => {
  console.log("server is running");
});

// module.exports = server;
