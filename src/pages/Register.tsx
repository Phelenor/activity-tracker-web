import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/app_icon.svg";
import { register } from "../repositories/authRepository";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light">
      <div className="bg-surface-light p-8 rounded-xl border-2 border-primary-light shadow-md w-96 text-center">
        <img src={logo} alt="App Logo" className="w-48 h-48 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-light">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form id="register" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="name"
              placeholder="Name"
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-primary-light"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded focus:outline-primary-light"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded focus:outline-primary-light"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-primary-light text-primary-on py-2 rounded hover:bg-primary-container hover:text-surface-on">
            Register
          </button>
        </form>
        <div className="mt-4 text-surface-on">
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-primary-light hover:underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
