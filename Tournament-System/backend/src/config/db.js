const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({

    host: process.env.DB_HOST,

    port: process.env.DB_PORT,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    connectTimeout: Number(
        process.env.DB_CONNECT_TIMEOUT || 60000
    ),

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    ssl:
        process.env.DB_SSL === "false"
            ? false
            : {
                rejectUnauthorized: false
            }

});

module.exports = pool.promise();