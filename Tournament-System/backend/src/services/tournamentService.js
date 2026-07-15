const TournamentModel =
require("../models/tournamentModel");

const RegistrationModel =
require("../models/registrationModel");

const AppError =
require("../exceptions/AppError");

class TournamentService {

    // Create Tournament
    static async createTournament(data) {

        const {

            name,

            maxPlayers

        } = data;

        if (!name || !maxPlayers) {

            throw new AppError(

                "All fields are required.",

                400

            );

        }

        if (maxPlayers <= 0) {

            throw new AppError(

                "Maximum players should be greater than zero.",

                400

            );

        }

        const result =
            await TournamentModel.create({

                name,

                maxPlayers

            });

        return {

            id: result.insertId,

            name,

            maxPlayers

        };

    }

    // Get All Tournaments
    static async getTournaments() {

        return await TournamentModel.findAll();

    }

    // Get Tournament
    static async getTournament(id) {

        const tournament =
            await TournamentModel.findById(id);

        if (!tournament) {

            throw new AppError(

                "Tournament not found.",

                404

            );

        }

        return tournament;

    }

    // Update Tournament
    static async updateTournament(id, data) {

        const tournament =
            await TournamentModel.findById(id);

        if (!tournament) {

            throw new AppError(

                "Tournament not found.",

                404

            );

        }

        if (

            data.maxPlayers &&

            data.maxPlayers <= 0

        ) {

            throw new AppError(

                "Maximum players should be greater than zero.",

                400

            );

        }

        // Capacity Validation
        const currentPlayers =
            await RegistrationModel
                .countByTournament(id);

        const capacity =

            data.maxPlayers ||

            tournament.max_players;

        if (

            capacity < currentPlayers

        ) {

            throw new AppError(

                "New capacity is smaller than registered players.",

                400

            );

        }

        await TournamentModel.update(id, {

            name:
                data.name ||

                tournament.name,

            maxPlayers:
                data.maxPlayers ||

                tournament.max_players

        });

        return await TournamentModel.findById(id);

    }

    // Delete Tournament
    static async deleteTournament(id) {

        const tournament =
            await TournamentModel.findById(id);

        if (!tournament) {

            throw new AppError(

                "Tournament not found.",

                404

            );

        }

        await TournamentModel.delete(id);

        return {

            message:
                "Tournament deleted successfully."

        };

    }

}

module.exports = TournamentService;