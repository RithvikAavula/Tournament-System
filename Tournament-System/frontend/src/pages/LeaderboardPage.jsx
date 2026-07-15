import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function LeaderboardPage() {
  const [tournaments, setTournaments] = useState([]);
  const [tournamentId, setTournamentId] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [playerRank, setPlayerRank] = useState(null);
  const [message, setMessage] = useState("Select a tournament, then check a player's rank.");

  useEffect(() => {
    api.get("/tournaments")
      .then((response) => setTournaments(response.data))
      .catch((error) => setMessage(error.message));
  }, []);

  async function loadLeaderboard() {
    if (!tournamentId) {
      setMessage("Please select a tournament.");
      return;
    }

    try {
      const response = await api.get(`/tournaments/${tournamentId}/leaderboard`);
      setLeaderboard(response.data);
      setPlayerRank(null);
      setMessage(response.data.length === 0 ? "No scores available." : "Leaderboard loaded successfully.");
    } catch (error) {
      setMessage(error.message);
      setLeaderboard([]);
    }
  }

  async function loadPlayerRank() {
    if (!tournamentId) {
      setMessage("Please select a tournament.");
      return;
    }

    if (!playerId) {
      setMessage("Please enter a player ID.");
      return;
    }

    try {
      const response = await api.get(`/tournaments/${tournamentId}/player/${playerId}`);
      setPlayerRank(response.data);
      setMessage("Player rank loaded successfully.");
    } catch (error) {
      setPlayerRank(null);
      setMessage(error.message);
    }
  }

  return (
    <>
      <section className="hero">
        <h2>Live Leaderboard</h2>
        <p>Track tournament standings and inspect a single player's current rank and score.</p>
      </section>

      <div className="page-title"><h2>Leaderboard</h2></div>

      <section className="dashboard-grid leaderboard-tools">
        <div className="card leaderboard-lookup">
          <div className="form-group">
            <label htmlFor="tournamentSelect">Select Tournament</label>
            <select id="tournamentSelect" value={tournamentId} onChange={(e) => setTournamentId(e.target.value)}>
              <option value="">Select Tournament</option>
              {tournaments.map((tournament) => <option key={tournament.id} value={tournament.id}>{tournament.name}</option>)}
            </select>
          </div>
          <button className="btn" type="button" onClick={loadLeaderboard}>Load Leaderboard</button>
        </div>

        <div className="card leaderboard-rank-card">
          <div className="form-group">
            <label htmlFor="playerIdInput">Check Player Rank</label>
            <input id="playerIdInput" type="number" min="1" value={playerId} onChange={(e) => setPlayerId(e.target.value)} placeholder="Enter player ID" />
          </div>
          <button className="btn btn-secondary" type="button" onClick={loadPlayerRank}>View Rank</button>

          <div className="status-card rank-highlight mt-20">
            {playerRank ? (
              <>
                <div className="rank-badge">#{playerRank.rank}</div>
                <h3>{playerRank.name}</h3>
                <p><strong>Score:</strong> {playerRank.score}</p>
                <p><strong>Country:</strong> {playerRank.country}</p>
              </>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
      </section>

      <table>
        <thead>
          <tr><th>Rank</th><th>Player</th><th>Country</th><th>Score</th></tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr><td colSpan="4">{message}</td></tr>
          ) : (
            leaderboard.map((player) => (
              <tr key={`${player.playerId}-${player.rank}`}>
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.country}</td>
                <td>{player.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}