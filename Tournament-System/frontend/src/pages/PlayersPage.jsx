import React, { useEffect, useState } from "react";
import { api } from "../api";

const emptyForm = { name: "", email: "", country: "" };

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadPlayers() {
    const response = await api.get("/players");
    setPlayers(response.data);
  }

  useEffect(() => {
    loadPlayers().catch((error) => setMessage(error.message));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingId) {
        await api.put(`/players/${editingId}`, form);
        setMessage("Player updated successfully.");
      } else {
        await api.post("/players", form);
        setMessage("Player created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadPlayers();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleEdit(player) {
    setEditingId(player.id);
    setForm({ name: player.name, email: player.email, country: player.country });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this player?")) return;

    try {
      await api.delete(`/players/${id}`);
      setMessage("Player deleted successfully.");
      await loadPlayers();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <>
      <div className="page-title"><h2>Create Player</h2></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required />
        </div>
        <button className="btn" type="submit">{editingId ? "Update Player" : "Create Player"}</button>
      </form>

      {message ? <div className="status-card mt-20">{message}</div> : null}

      <div className="page-title mt-30"><h2>Players List</h2></div>

      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Country</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.email}</td>
              <td>{player.country}</td>
              <td>
                <button type="button" className="edit-btn" onClick={() => handleEdit(player)}>Edit</button>
                <button type="button" className="delete-btn" onClick={() => handleDelete(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}