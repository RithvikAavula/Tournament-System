
const PlayerModel = require("../models/playerModel");
const TournamentModel = require("../models/tournamentModel");
const RegistrationModel = require("../models/registrationModel");
const AppError = require("../exceptions/AppError");

class RegistrationService {

    // Register Player
    static async registerPlayer(data) {
        const { tournamentId, playerId } = data;

        const player = await PlayerModel.findById(playerId);
        if (!player) throw new AppError("Player not found.", 404);

        const tournament = await TournamentModel.findById(tournamentId);
        if (!tournament) throw new AppError("Tournament not found.", 404);

        const registration = await RegistrationModel.findOne(playerId, tournamentId);
        if (registration) throw new AppError("Player already registered for this tournament.", 409);

        const registeredPlayers = await RegistrationModel.countByTournament(tournamentId);
        if (registeredPlayers >= tournament.max_players) throw new AppError("Tournament is full.", 400);

        const result = await RegistrationModel.create({ tournamentId, playerId });

        return {
            registrationId: result.insertId,
            tournamentId,
            playerId,
            message: "Player registered successfully."
        };
    }

    // Player Registrations
    static async getPlayerRegistrations(playerId) {
        const player = await PlayerModel.findById(playerId);
        if (!player) throw new AppError("Player not found.", 404);
        return await RegistrationModel.findByPlayer(playerId);
    }

    // Tournament Registrations
    static async getTournamentRegistrations(tournamentId) {
        const tournament = await TournamentModel.findById(tournamentId);
        if (!tournament) throw new AppError("Tournament not found.", 404);
        return await RegistrationModel.findByTournament(tournamentId);
    }

    // Registered Players
    static async getRegisteredPlayers(tournamentId) {
        const tournament = await TournamentModel.findById(tournamentId);
        if (!tournament) throw new AppError("Tournament not found.", 404);
        return await RegistrationModel.getRegisteredPlayers(tournamentId);
    }

}

module.exports = RegistrationService;