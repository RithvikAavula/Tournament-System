import React, { useEffect, useState } from "react";
import { api } from "../api";

const emptyForm = { name: "", maxPlayers: "" };

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadTournaments() {
    const response = await api.get("/tournaments");
    setTournaments(response.data);
  }

  useEffect(() => {
    loadTournaments().catch((error) => setMessage(error.message));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { name: form.name, maxPlayers: Number(form.maxPlayers) };

    try {
      if (editingId) {
        await api.put(`/tournaments/${editingId}`, payload);
        setMessage("Tournament updated successfully.");
      } else {
        await api.post("/tournaments", payload);
        setMessage("Tournament created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadTournaments();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleEdit(tournament) {
    setEditingId(tournament.id);
    setForm({ name: tournament.name, maxPlayers: tournament.max_players });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete Tournament?")) return;

    try {
      await api.delete(`/tournaments/${id}`);
      setMessage("Tournament deleted successfully.");
      await loadTournaments();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <>
      <div className="page-title"><h2>Create Tournament</h2></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tournament Name</label>
          <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="maxPlayers">Maximum Players</label>
          <input id="maxPlayers" type="number" value={form.maxPlayers} onChange={(e) => setForm({ ...form, maxPlayers: e.target.value })} required />
        </div>
        <button className="btn" type="submit">{editingId ? "Update Tournament" : "Create Tournament"}</button>
      </form>

      {message ? <div className="status-card mt-20">{message}</div> : null}

      <div className="page-title mt-30"><h2>Tournament List</h2></div>

      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Capacity</th><th>Created At</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.id}</td>
              <td>{tournament.name}</td>
              <td>{tournament.max_players}</td>
              <td>{new Date(tournament.created_at).toLocaleDateString()}</td>
              <td>
                <button type="button" className="edit-btn" onClick={() => handleEdit(tournament)}>Edit</button>
                <button type="button" className="delete-btn" onClick={() => handleDelete(tournament.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}