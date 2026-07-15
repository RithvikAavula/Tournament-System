const db = require("../config/db");

class PlayerModel {

    static async create(data) {

        const { name, email, country } = data;

        const [result] = await db.query(
            `INSERT INTO players (name,email,country)
             VALUES (?,?,?)`,
            [name, email, country]
        );

        return result;

    }

    static async findAll() {

        const [rows] = await db.query(

            `SELECT *
             FROM players
             ORDER BY id DESC`

        );

        return rows;

    }

    static async findById(id) {

        const [rows] = await db.query(

            `SELECT *
             FROM players
             WHERE id=?`,

            [id]

        );

        return rows[0] || null;

    }

    static async findByEmail(email) {

        const [rows] = await db.query(

            `SELECT *
             FROM players
             WHERE email=?`,

            [email]

        );

        return rows[0] || null;

    }

    // NEW
    static async findAvailablePlayers(tournamentId) {

        const [rows] = await db.query(

            `SELECT *

             FROM players

             WHERE id NOT IN (

                SELECT player_id

                FROM registrations

                WHERE tournament_id=?

             )

             ORDER BY name ASC`,

            [tournamentId]

        );

        return rows;

    }

    static async update(id, data) {

        const { name, email, country } = data;

        const [result] = await db.query(

            `UPDATE players

             SET

                name=?,

                email=?,

                country=?

             WHERE id=?`,

            [

                name,

                email,

                country,

                id

            ]

        );

        return result;

    }

    static async delete(id) {

        const [result] = await db.query(

            `DELETE FROM players

             WHERE id=?`,

            [id]

        );

        return result;

    }

}

module.exports = PlayerModel;