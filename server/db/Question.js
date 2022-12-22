const Sequelize = require("sequelize");
const db = require("./db");

const Question = db.define("question", {
  category: {
    type: Sequelize.STRING,
  },
  correctAnswer: {
    type: Sequelize.TEXT,
  },
  incorrectAnswers: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  question: {
    type: Sequelize.TEXT,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  difficulty: {
    type: Sequelize.STRING,
  },
});

module.exports = Question;
