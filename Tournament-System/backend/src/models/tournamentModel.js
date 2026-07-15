const db = require("../config/db");

class TournamentModel {

    // Create Tournament
    static async create(data) {

        const { name, maxPlayers } = data;

        const [result] = await db.query(
            `INSERT INTO tournaments (name, max_players)
             VALUES (?, ?)`,
            [name, maxPlayers]
        );

        return result;
    }

    // Get All Tournaments
    static async findAll() {

        const [rows] = await db.query(
            `SELECT *
             FROM tournaments
             ORDER BY id DESC`
        );

        return rows;
    }

    // Get Tournament By ID
    static async findById(id) {

        const [rows] = await db.query(
            `SELECT *
             FROM tournaments
             WHERE id = ?`,
            [id]
        );

        return rows[0] || null;
    }

    // Update Tournament
    static async update(id, data) {

        const { name, maxPlayers } = data;

        const [result] = await db.query(
            `UPDATE tournaments
             SET name = ?, max_players = ?
             WHERE id = ?`,
            [name, maxPlayers, id]
        );

        return result;
    }

    // Delete Tournament
    static async delete(id) {

        const [result] = await db.query(
            `DELETE FROM tournaments
             WHERE id = ?`,
            [id]
        );

        return result;
    }

}

module.exports = TournamentModel;