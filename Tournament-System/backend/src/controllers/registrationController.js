const RegistrationService =
require("../services/registrationService");

const { successResponse } =
require("../utils/response");

class RegistrationController {

    static async registerPlayer(
        req,
        res,
        next
    ) {

        try {

            const data = {

                tournamentId: req.params.id,

                playerId: req.body.playerId

            };

            const result =
                await RegistrationService.registerPlayer(

                    data

                );

            return successResponse(

                res,

                result.message,

                result,

                201

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async getRegisteredPlayers(

        req,

        res,

        next

    ){

        try{

            const players =

            await RegistrationService.getRegisteredPlayers(

                req.params.id
            );

            return successResponse(

                res,

                "Registered players fetched successfully.",

                players
            );

        }

        catch(error){

            next(error);

        }

    }

}

module.exports = RegistrationController;