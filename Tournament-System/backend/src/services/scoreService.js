const PlayerModel = require("../models/playerModel");
const TournamentModel = require("../models/tournamentModel");
const RegistrationModel = require("../models/registrationModel");
const ScoreModel = require("../models/scoreModel");
const AppError = require("../exceptions/AppError");

class ScoreService {

    // Submit Score
    static async submitScore(data) {

        const {

            tournamentId,

            playerId,

            score

        } = data;

        // Score Validation
        if (score < 0) {

            throw new AppError(
                "Score cannot be negative.",
                400
            );

        }

        // Player Exists
        const player =
            await PlayerModel.findById(
                playerId
            );

        if (!player) {

            throw new AppError(
                "Player not found.",
                404
            );

        }

        // Tournament Exists
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

        // Registration Check
        const registration =
            await RegistrationModel.findOne(
                playerId,
                tournamentId
            );

        if (!registration) {

            throw new AppError(
                "Player is not registered for this tournament.",
                400
            );

        }

        // Insert / Update Score
        await ScoreModel.createOrUpdate({

            tournamentId,

            playerId,

            score

        });

        return {

            playerId,

            tournamentId,

            score,

            message:
                "Score submitted successfully."

        };

    }

    // Player Scores
    static async getPlayerScores(playerId) {

        const player =
            await PlayerModel.findById(
                playerId
            );

        if (!player) {

            throw new AppError(
                "Player not found.",
                404
            );

        }

        return await ScoreModel.findByPlayer(
            playerId
        );

    }

    // Tournament Scores
    static async getTournamentScores(
        tournamentId
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

        return await ScoreModel.findByTournament(
            tournamentId
        );

    }

}

module.exports = ScoreService;