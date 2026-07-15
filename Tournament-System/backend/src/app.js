const express = require("express");
const cors = require("cors");

const playerRoutes = require("./routes/playerRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// Disable the X-Powered-By header to avoid disclosing framework/version info
app.disable("x-powered-by");

// Configure CORS to allow only trusted origins. Set CORS_ORIGINS as a
// comma-separated list of allowed origins in the environment (e.g.
// CORS_ORIGINS=http://localhost:3000,https://example.com)
const allowedOrigins = new Set(
    (process.env.CORS_ORIGINS || "http://localhost:3000")
        .split(",")
        .map(o => o.trim())
        .filter(Boolean)
);

const localOriginPattern =
    /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/;

const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        if (
            allowedOrigins.has(origin) ||
            localOriginPattern.test(origin)
        ) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy: Origin not allowed'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Tournament Registration API Running"

    });

});

// Routes

app.use("/api/players", playerRoutes);

app.use("/api/tournaments", tournamentRoutes);

app.use("/api/tournaments", registrationRoutes);

app.use("/api/tournaments", scoreRoutes);

app.use("/api/tournaments", leaderboardRoutes);

app.use("/api/auth", authRoutes);

// Error Handler

app.use(errorHandler);

module.exports = app;