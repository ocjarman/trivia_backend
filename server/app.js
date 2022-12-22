const express = require("express");
const app = express();
const path = require("path");
const volleyball = require("volleyball");
const cors = require("cors");
// const http = require("http");

// Set up middleware
app.use(volleyball);
app.use(express.json());

// need cors to make connection with frontend
app.use(cors());

//sets up body for us when making post requests or any req that needs a body
// app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api", require("./api"));

module.exports = app;
