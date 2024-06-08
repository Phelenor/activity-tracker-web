import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/app_icon.svg";
import { login } from "../repositories/authRepository";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response = await login(email, password);
      auth.login(response.accessToken);
      navigate("/admin");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light">
      <div className="bg-surface-light p-8 rounded-xl border-2 border-primary-light shadow-md w-96 text-center">
        <img src={logo} alt="App Logo" className="w-48 h-48 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-light">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form id="login" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-primary-light"
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
            Login
          </button>
        </form>
        <div className="mt-4 text-surface-on">
          <span>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-light hover:underline">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
