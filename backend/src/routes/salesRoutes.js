const express = require("express");
const { getSales, getMeta } = require("../controllers/salesController");

const router = express.Router();

router.get("/", getSales);
router.get("/meta", getMeta);

module.exports = router;
