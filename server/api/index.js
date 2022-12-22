const express = require("express");
const router = express.Router();

router.use("/questions", require("./questionsRouter"));

module.exports = router;
