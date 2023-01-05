const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("hi world");
    res.send({ health: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
