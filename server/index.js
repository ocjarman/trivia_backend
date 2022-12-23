const express = require("express");
const app = express();
const path = require("path");
const volleyball = require("volleyball");

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

  socket.on("join_room", (data) => {
    console.log("joined room", data);

    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // take the data received and broadcasts to others
    console.log("received send event", data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(4000, () => {
  console.log("server is running");
});

// module.exports = server;
