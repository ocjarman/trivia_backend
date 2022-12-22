const Sequelize = require("sequelize");
const db = require("./db");

const Game = db.define("game", {
  status: {
    type: Sequelize.ENUM("ongoing", "complete"),
    defaultValue: "ongoing",
  },
  winner: {
    type: Sequelize.STRING,
  },
});

module.exports = Game;
