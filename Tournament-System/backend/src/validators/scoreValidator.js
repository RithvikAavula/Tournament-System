const { body } = require("express-validator");

const scoreValidator = [

    body("playerId")
        .isInt()
        .withMessage("Valid playerId is required."),

    body("score")
        .isFloat({ min: 0 })
        .withMessage("Score must be greater than or equal to 0.")

];

module.exports = scoreValidator;