import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function ScoresPage() {
  const [tournaments, setTournaments] = useState([]);
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [tournamentId, setTournamentId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("No score submitted yet.");

  useEffect(() => {
    api.get("/tournaments")
      .then((response) => setTournaments(response.data))
      .catch((error) => setMessage(error.message));
  }, []);

  async function handleTournamentChange(value) {
    setTournamentId(value);
    setPlayerId("");

    if (!value) {
      setRegisteredPlayers([]);
      return;
    }

    try {
      const response = await api.get(`/tournaments/${value}/registrations`);
      setRegisteredPlayers(response.data);
    } catch (error) {
      setMessage(error.message);
      setRegisteredPlayers([]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post(`/tournaments/${tournamentId}/score`, {
        playerId: Number(playerId),
        score: Number(score)
      });
      setMessage(response.message);
      setScore("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <>
      <div className="page-title"><h2>Submit Score</h2></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tournamentSelect">Tournament</label>
          <select id="tournamentSelect" value={tournamentId} onChange={(e) => handleTournamentChange(e.target.value)} required>
            <option value="">Select Tournament</option>
            {tournaments.map((tournament) => <option key={tournament.id} value={tournament.id}>{tournament.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="playerSelect">Player</label>
          <select id="playerSelect" value={playerId} onChange={(e) => setPlayerId(e.target.value)} required>
            <option value="">Select Player</option>
            {registeredPlayers.length === 0 && tournamentId ? <option value="">No Registered Players</option> : null}
            {registeredPlayers.map((player) => <option key={player.player_id} value={player.player_id}>{player.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="score">Score</label>
          <input id="score" type="number" min="0" value={score} onChange={(e) => setScore(e.target.value)} required />
        </div>

        <button className="btn" type="submit" disabled={!tournamentId || !playerId}>Submit Score</button>
      </form>

      <div className="status-card mt-20">{message}</div>
    </>
  );
}