const TournamentModel = require("../models/tournamentModel");
const ScoreModel = require("../models/scoreModel");
const AppError = require("../exceptions/AppError");

class LeaderboardService {

    // Tournament Leaderboard
    static async getLeaderboard(tournamentId) {

        const tournament =
            await TournamentModel.findById(tournamentId);

        if (!tournament) {

            throw new AppError(

                "Tournament not found.",

                404

            );

        }

        const leaderboard =
            await ScoreModel.findByTournament(
                tournamentId
            );

        if (leaderboard.length === 0) {

            return [];

        }

        return leaderboard.map((player, index) => ({

            rank: index + 1,

            playerId: player.player_id,

            name: player.name,

            country: player.country,

            score: player.score

        }));

    }

    // Particular Player Rank
    static async getPlayerRank(

        tournamentId,

        playerId

    ) {

        const tournament =
            await TournamentModel.findById(
                tournamentId
            );

        if (!tournament) {

            throw new AppError(

                "Tournament not found.",

                404

            );

        }

        const leaderboard =
            await ScoreModel.findByTournament(
                tournamentId
            );

        if (leaderboard.length === 0) {

            throw new AppError(

                "Leaderboard is empty.",

                404

            );

        }

        const index = leaderboard.findIndex(

            player => player.player_id == playerId

        );

        if (index === -1) {

            throw new AppError(

                "Player score not found.",

                404

            );

        }

        return {

            rank: index + 1,

            playerId: leaderboard[index].player_id,

            name: leaderboard[index].name,

            country: leaderboard[index].country,

            score: leaderboard[index].score

        };

    }

}

module.exports = LeaderboardService;