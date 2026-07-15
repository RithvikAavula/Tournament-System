const express = require("express");

const router = express.Router();

const TournamentController = require("../controllers/tournamentController");

const validator = require("../middleware/validator");

const tournamentValidator = require("../validators/tournamentValidator");

router.post(
    "/",
    tournamentValidator,
    validator,
    TournamentController.createTournament
);

router.get(
    "/",
    TournamentController.getTournaments
);

router.get(
    "/:id",
    TournamentController.getTournament
);

router.put(
    "/:id",
    tournamentValidator,
    validator,
    TournamentController.updateTournament
);

router.delete(
    "/:id",
    TournamentController.deleteTournament
);

module.exports = router;