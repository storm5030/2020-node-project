// const express = require("express");
// conste router = express.Router();
const { Router } = require("express"); //express.Router()
const router = Router();

router.use("/movie", require("./movie"));
router.use("/user", require("./user"));
router.use("/reservation", require("./reservation"));

module.exports = router;
