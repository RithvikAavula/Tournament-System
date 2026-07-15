require("dotenv").config();

const app = require("./app");

const db = require("./config/db");

const PORT = process.env.PORT || 5000;

function startListening() {

    app.listen(PORT, () => {

        console.log("");

        console.log("=======================================");

        console.log(`🚀 Server Running`);

        console.log(`http://localhost:${PORT}`);

        console.log("=======================================");

    });

}

async function startServer() {

    try {

        await db.query("SELECT 1");

        console.log("✅ Database connection established");

    }

    catch (error) {

        console.log("");

        console.log("⚠️ Database connection failed, starting server anyway");

        console.log(error.message);

    }

    startListening();

}

startServer();