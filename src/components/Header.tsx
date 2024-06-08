import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/app_icon.svg";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const linkClass = (path: string) =>
    location.pathname === path
      ? "bg-tertiary-container text-surface-on py-2 px-4 rounded border border-tertiary-light border-width-8"
      : "bg-primary-container text-surface-on py-2 px-4 rounded border border-transparent hover:border-tertiary-light hover:border-dotted";

  return (
    <header className="bg-primary-light text-white py-4 px-8 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="App Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-bold">Activity Tracker GYM</h1>
      </div>
      <nav className="flex space-x-4">
        <Link to="/admin" className={linkClass("/admin")}>
          ADMIN
        </Link>
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          DASHBOARD
        </Link>
      </nav>
      <button onClick={logout} className="text-white hover:underline">
        Logout
      </button>
    </header>
  );
};

export default Header;
