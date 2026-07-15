const express = require("express");

const router = express.Router();

const LeaderboardController = require("../controllers/leaderboardController");

router.get(
    "/:id/leaderboard",
    LeaderboardController.getLeaderboard
);

router.get(
    "/:id/player/:playerId",
    LeaderboardController.getPlayerRank
);

module.exports = router;