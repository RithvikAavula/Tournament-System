const LeaderboardService =
require("../services/leaderboardService");

const { successResponse } =
require("../utils/response");

class LeaderboardController {

    static async getLeaderboard(
        req,
        res,
        next
    ) {

        try {

            const leaderboard =
                await LeaderboardService.getLeaderboard(

                    req.params.id

                );

            return successResponse(

                res,

                "Leaderboard fetched successfully.",

                leaderboard

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async getPlayerRank(
        req,
        res,
        next
    ) {

        try {

            const playerRank =
                await LeaderboardService.getPlayerRank(

                    req.params.id,

                    req.params.playerId

                );

            return successResponse(

                res,

                "Player rank fetched successfully.",

                playerRank

            );

        }

        catch (error) {

            next(error);

        }

    }

}

module.exports = LeaderboardController;