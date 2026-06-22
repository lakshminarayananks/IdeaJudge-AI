const express = require("express");
const router = express.Router();

const { evaluateIdea } = require("../controllers/projectController");

router.post("/evaluate", evaluateIdea);

module.exports = router;