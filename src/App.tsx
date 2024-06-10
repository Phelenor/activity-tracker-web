import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GymEquipment from "./components/GymEquipment";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import { getUserId } from "./utils/token";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={isAuthenticated ? <GymEquipment /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard userId={getUserId() ?? ""} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/admin" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
