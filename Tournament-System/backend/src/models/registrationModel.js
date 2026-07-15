const db = require("../config/db");

class RegistrationModel {

    static async create(data) {

        const { tournamentId, playerId } = data;

        const [result] = await db.query(

            `INSERT INTO registrations
            (tournament_id,player_id)

            VALUES (?,?)`,

            [tournamentId, playerId]

        );

        return result;

    }

    static async findOne(playerId, tournamentId) {

        const [rows] = await db.query(

            `SELECT *

            FROM registrations

            WHERE player_id=?

            AND tournament_id=?`,

            [playerId, tournamentId]

        );

        return rows[0] || null;

    }

    static async countByTournament(tournamentId) {

        const [rows] = await db.query(

            `SELECT COUNT(*) AS total

            FROM registrations

            WHERE tournament_id=?`,

            [tournamentId]

        );

        return rows[0].total;

    }

    // NEW

    static async getRegisteredPlayers(tournamentId) {

        const [rows] = await db.query(

            `SELECT

                p.id AS player_id,

                p.name,

                p.email,

                p.country

            FROM registrations r

            INNER JOIN players p

            ON r.player_id=p.id

            WHERE r.tournament_id=?`,

            [tournamentId]

        );

        return rows;

    }

}

module.exports = RegistrationModel;