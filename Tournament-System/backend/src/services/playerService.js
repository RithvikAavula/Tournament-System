const PlayerModel = require("../models/playerModel");
const AppError = require("../exceptions/AppError");

class PlayerService {

    // Create Player
    static async createPlayer(data) {

        const { name, email, country } = data;

        // Required Validation
        if (!name || !email || !country) {
            throw new AppError(
                "All fields are required.",
                400
            );
        }

        // Email Validation
        const emailRegex =
            /^[^\s@]+@[^\s@]+$/;

        if (!emailRegex.test(email)) {

            throw new AppError(
                "Invalid email format.",
                400
            );

        }

        // Duplicate Email
        const existingPlayer =
            await PlayerModel.findByEmail(email);

        if (existingPlayer) {

            throw new AppError(
                "Email already exists.",
                409
            );

        }

        const result =
            await PlayerModel.create({

                name,

                email,

                country

            });

        return {

            id: result.insertId,

            name,

            email,

            country

        };

    }

    // Get All Players
    static async getPlayers() {

        return await PlayerModel.findAll();

    }

    // Available Players For Tournament
    static async getAvailablePlayers(tournamentId) {

        return await PlayerModel.findAvailablePlayers(

            tournamentId

        );

    }

    // Get Player By Id
    static async getPlayer(id) {

        const player =
            await PlayerModel.findById(id);

        if (!player) {

            throw new AppError(
                "Player not found.",
                404
            );

        }

        return player;

    }

    // Update Player
    static async updatePlayer(id, data) {

        const player =
            await PlayerModel.findById(id);

        if (!player) {

            throw new AppError(
                "Player not found.",
                404
            );

        }

        if (data.email &&
            data.email !== player.email) {

            const duplicate =
                await PlayerModel.findByEmail(
                    data.email
                );

            if (duplicate) {

                throw new AppError(
                    "Email already exists.",
                    409
                );

            }

        }

        await PlayerModel.update(id, {

            name:
                data.name || player.name,

            email:
                data.email || player.email,

            country:
                data.country || player.country

        });

        return await PlayerModel.findById(id);

    }

    // Delete Player
    static async deletePlayer(id) {

        const player =
            await PlayerModel.findById(id);

        if (!player) {

            throw new AppError(
                "Player not found.",
                404
            );

        }

        await PlayerModel.delete(id);

        return {

            message:
                "Player deleted successfully."

        };

    }

}

module.exports = PlayerService;