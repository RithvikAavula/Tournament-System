const db = require("../config/db");

class ScoreModel {

    // Create or Update Score
    static async createOrUpdate(data) {

        const { tournamentId, playerId, score } = data;

        const [result] = await db.query(

            `INSERT INTO scores
            (tournament_id, player_id, score)

            VALUES (?, ?, ?)

            ON DUPLICATE KEY UPDATE

            score = VALUES(score)`,

            [tournamentId, playerId, score]

        );

        return result;

    }

    // Find Score of Player in Tournament
    static async findOne(playerId, tournamentId) {

        const [rows] = await db.query(

            `SELECT *
             FROM scores
             WHERE player_id = ?
             AND tournament_id = ?`,

            [playerId, tournamentId]

        );

        return rows[0] || null;

    }

    // Leaderboard Query
    static async findByTournament(tournamentId) {

        const [rows] = await db.query(

            `SELECT

                p.id AS player_id,

                p.name,

                p.country,

                s.score

            FROM scores s

            INNER JOIN players p

            ON s.player_id = p.id

            WHERE s.tournament_id = ?

            ORDER BY s.score DESC`,

            [tournamentId]

        );

        return rows;

    }

    // Player Scores
    static async findByPlayer(playerId) {

        const [rows] = await db.query(

            `SELECT

                s.id,

                s.tournament_id,

                t.name AS tournament_name,

                s.score

            FROM scores s

            INNER JOIN tournaments t

            ON s.tournament_id = t.id

            WHERE s.player_id = ?`,

            [playerId]

        );

        return rows;

    }

    // Delete Score
    static async delete(id) {

        const [result] = await db.query(

            `DELETE FROM scores
             WHERE id = ?`,

            [id]

        );

        return result;

    }

}

module.exports = ScoreModel;