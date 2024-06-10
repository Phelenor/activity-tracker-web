import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserToken, removeUserId, removeUserToken, setUserToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { resetApi } from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getUserToken();

    if (token) {
      let decodedToken = jwtDecode(token);
      let currentDate = new Date();

      if (decodedToken?.exp) {
        let tokenExpired = decodedToken.exp * 1000 < currentDate.getTime();
        setIsAuthenticated(!tokenExpired);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (token: string) => {
    setUserToken(token);
    setIsAuthenticated(true);
    resetApi();
    navigate("/admin");
  };

  const logout = () => {
    removeUserToken();
    removeUserId();
    setIsAuthenticated(false);
    resetApi();
    navigate("/login");
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
