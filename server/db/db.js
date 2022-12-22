const Sequelize = require("sequelize");
const config = {
  logging: false,
};
const DB_NAME = "trivia_game";
const URL = `postgres://localhost/${DB_NAME}`;

const db = new Sequelize(process.env.DATABASE_URL || URL, config);

module.exports = db;
