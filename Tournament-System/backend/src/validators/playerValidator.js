const { body } = require("express-validator");

const playerValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required."),

    body("country")
        .trim()
        .notEmpty()
        .withMessage("Country is required.")

];

module.exports = playerValidator;