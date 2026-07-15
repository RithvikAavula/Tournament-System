const express = require("express");

const router = express.Router();

const PlayerController = require("../controllers/playerController");

const validator = require("../middleware/validator");

const playerValidator = require("../validators/playerValidator");

router.post(
    "/",
    playerValidator,
    validator,
    PlayerController.createPlayer
);

router.get(
    "/",
    PlayerController.getPlayers
);

router.get(
    "/available/:id",
    PlayerController.getAvailablePlayers
);

router.get(
    "/:id",
    PlayerController.getPlayer
);

router.put(
    "/:id",
    playerValidator,
    validator,
    PlayerController.updatePlayer
);

router.delete(
    "/:id",
    PlayerController.deletePlayer
);

module.exports = router;