import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function DashboardPage() {
  const [counts, setCounts] = useState({ players: "--", tournaments: "--" });

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const [playersResponse, tournamentsResponse] = await Promise.all([
          api.get("/players"),
          api.get("/tournaments")
        ]);

        if (active) {
          setCounts({
            players: playersResponse.data.length,
            tournaments: tournamentsResponse.data.length
          });
        }
      } catch {
        if (active) {
          setCounts({ players: "--", tournaments: "--" });
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <h2>Welcome to the Tournament Hub</h2>
        <p>Manage players, tournaments, registrations, scores, and live rankings from one streamlined interface.</p>
      </section>

      <section className="dashboard-grid">
        <div className="card">
          <h3>Total Players</h3>
          <h1>{counts.players}</h1>
        </div>
        <div className="card">
          <h3>Total Tournaments</h3>
          <h1>{counts.tournaments}</h1>
        </div>
        <div className="card">
          <h3>Registrations</h3>
          <h1>Active</h1>
          <p className="card-body">Register players into tournaments and maintain the live participation list.</p>
        </div>
        <div className="card">
          <h3>Leaderboard</h3>
          <h1>Live</h1>
          <p className="card-body">Track ranks and scores in real time after score submissions.</p>
        </div>
      </section>

      <section className="features">
        <h2>Project Features</h2>
        <div className="feature-grid">
          <div className="feature-card"><h3>Player Management</h3><p>Create, update, and delete players.</p></div>
          <div className="feature-card"><h3>Tournament Management</h3><p>Manage tournaments with player capacity.</p></div>
          <div className="feature-card"><h3>Registration</h3><p>Register only available players into tournaments.</p></div>
          <div className="feature-card"><h3>Scores</h3><p>Submit or update tournament scores.</p></div>
          <div className="feature-card"><h3>Leaderboard</h3><p>View rankings and player score positions.</p></div>
          <div className="feature-card"><h3>TiDB Cloud</h3><p>MySQL-compatible cloud database support.</p></div>
        </div>
      </section>
    </>
  );
}