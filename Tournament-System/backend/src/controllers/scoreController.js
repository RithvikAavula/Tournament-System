const ScoreService =
require("../services/scoreService");

const { successResponse } =
require("../utils/response");

class ScoreController {

    static async submitScore(
        req,
        res,
        next
    ) {

        try {

            const result =
                await ScoreService.submitScore({

                    tournamentId:
                        req.params.id,

                    playerId:
                        req.body.playerId,

                    score:
                        req.body.score

                });

            return successResponse(

                res,

                result.message,

                result

            );

        }

        catch (error) {

            next(error);

        }

    }

}

module.exports = ScoreController;