const express = require("express");
const router = express.Router();

router.use("/health", require("./healthRouter.js"));

module.exports = router;
