const { body } = require("express-validator");

const registrationValidator = [

    body("playerId")
        .isInt()
        .withMessage("Valid playerId is required.")

];

module.exports = registrationValidator;