const express = require("express");

const router = express.Router();

const ScoreController = require("../controllers/scoreController");

const validator = require("../middleware/validator");

const scoreValidator = require("../validators/scoreValidator");

router.post(
    "/:id/score",
    scoreValidator,
    validator,
    ScoreController.submitScore
);

module.exports = router;