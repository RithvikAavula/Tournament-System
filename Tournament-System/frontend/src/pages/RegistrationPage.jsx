import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function RegistrationPage() {
  const [tournaments, setTournaments] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [tournamentId, setTournamentId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [message, setMessage] = useState("Select a tournament and player to register.");

  useEffect(() => {
    api.get("/tournaments")
      .then((response) => setTournaments(response.data))
      .catch((error) => setMessage(error.message));
  }, []);

  async function handleTournamentChange(value) {
    setTournamentId(value);
    setPlayerId("");

    if (!value) {
      setAvailablePlayers([]);
      return;
    }

    try {
      const response = await api.get(`/players/available/${value}`);
      setAvailablePlayers(response.data);
    } catch (error) {
      setMessage(error.message);
      setAvailablePlayers([]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post(`/tournaments/${tournamentId}/register`, {
        playerId: Number(playerId)
      });
      setMessage(response.message);
      setPlayerId("");

      const refreshed = await api.get(`/players/available/${tournamentId}`);
      setAvailablePlayers(refreshed.data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <>
      <div className="page-title"><h2>Player Registration</h2></div>

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
            {availablePlayers.map((player) => <option key={player.id} value={player.id}>{player.name}</option>)}
          </select>
        </div>

        <button className="btn" type="submit" disabled={!tournamentId || !playerId}>Register Player</button>
      </form>

      <div className="status-card mt-20">{message}</div>
    </>
  );
}