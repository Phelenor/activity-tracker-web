import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GymEquipmentAdmin from "./components/GymEquipmentAdmin";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={isAuthenticated ? <GymEquipmentAdmin /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/admin" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
