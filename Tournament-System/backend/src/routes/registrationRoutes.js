const express = require("express");

const router = express.Router();

const RegistrationController =
require("../controllers/registrationController");

const validator =
require("../middleware/validator");

const registrationValidator =
require("../validators/registrationValidator");

router.post(

    "/:id/register",

    registrationValidator,

    validator,

    RegistrationController.registerPlayer

);

// NEW

router.get(

    "/:id/registrations",

    RegistrationController.getRegisteredPlayers

);

module.exports = router;