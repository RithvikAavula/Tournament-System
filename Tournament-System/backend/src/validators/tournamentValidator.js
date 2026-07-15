const { body } = require("express-validator");

const tournamentValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Tournament name is required."),

    body("maxPlayers")
        .isInt({ min: 1 })
        .withMessage("Maximum players should be greater than 0.")

];

module.exports = tournamentValidator;