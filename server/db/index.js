const db = require("./db");
const User = require("./User");
const Question = require("./Question");
const Game = require("./Game");
// const UserGames = require("./UserGames");
// const GameQuestions = require("./GameQuestions");

User.belongsToMany(Game, { through: "user_games" });
Game.belongsToMany(User, { through: "user_games" });

Game.belongsToMany(Question, { through: "game_questions" });
Question.belongsToMany(Game, { through: "game_questions" });

module.exports = {
  User,
  Question,
  Game,
  db,
};
