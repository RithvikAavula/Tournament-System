const TournamentService =
require("../services/tournamentService");

const { successResponse } =
require("../utils/response");

class TournamentController {

    static async createTournament(
        req,
        res,
        next
    ) {

        try {

            const tournament =
                await TournamentService.createTournament(

                    req.body

                );

            return successResponse(

                res,

                "Tournament created successfully.",

                tournament,

                201

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async getTournaments(
        req,
        res,
        next
    ) {

        try {

            const tournaments =
                await TournamentService.getTournaments();

            return successResponse(

                res,

                "Tournaments fetched successfully.",

                tournaments

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async getTournament(
        req,
        res,
        next
    ) {

        try {

            const tournament =
                await TournamentService.getTournament(

                    req.params.id

                );

            return successResponse(

                res,

                "Tournament fetched successfully.",

                tournament

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async updateTournament(
        req,
        res,
        next
    ) {

        try {

            const tournament =
                await TournamentService.updateTournament(

                    req.params.id,

                    req.body

                );

            return successResponse(

                res,

                "Tournament updated successfully.",

                tournament

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async deleteTournament(
        req,
        res,
        next
    ) {

        try {

            const result =
                await TournamentService.deleteTournament(

                    req.params.id

                );

            return successResponse(

                res,

                result.message

            );

        }

        catch (error) {

            next(error);

        }

    }

}

module.exports = TournamentController;