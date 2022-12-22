const express = require("express");
const { Question } = require("../db");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const question = await Question.findAll();
    res.send(question);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

module.exports = router;
