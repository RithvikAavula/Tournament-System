import React from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import PlayersPage from "./pages/PlayersPage";
import TournamentsPage from "./pages/TournamentsPage";
import RegistrationPage from "./pages/RegistrationPage";
import ScoresPage from "./pages/ScoresPage";
import LeaderboardPage from "./pages/LeaderboardPage";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/players", label: "Players" },
  { to: "/tournaments", label: "Tournaments" },
  { to: "/registration", label: "Registration" },
  { to: "/scores", label: "Scores" },
  { to: "/leaderboard", label: "Leaderboard" }
];

function Layout({ children }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Tournament Registration System</h1>
          <p>Internship assignment rebuilt in React while preserving the existing backend workflow</p>
        </div>
      </header>

      <nav className="navbar">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className="container">{children}</main>

      <footer>
        <p>© 2026 Tournament Registration System</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/scores" element={<ScoresPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}