// const express = require("express");
// conste router = express.Router();
const { Router } = require("express"); //express.Router()
const router = Router();

router.use("/music", require("./music"));
router.use("/movie", require("./movie"));

module.exports = router;
