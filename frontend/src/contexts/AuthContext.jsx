/* eslint-disable react-hooks/set-state-in-effect -- initial auth load legitimately syncs state from localStorage */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../utils/apiClient";
import { isTokenValid } from "../utils/jwt";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- hook export
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    if (!isTokenValid(storedToken)) {
      localStorage.removeItem("token");
      setLoading(false);
      return;
    }

    setToken(storedToken);
    apiClient
      .get("/api/auth/profile")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setLoading(false);
      });
  }, []);

  const signIn = async (email, password) => {
    const response = await apiClient.post("/api/auth/login", { email, password });
    const { token: authToken, user: userData } = response.data;
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(userData);
    navigate("/");
    return userData;
  };

  const signUp = async (name, email, password) => {
    const payload = { email, password };
    if (name && name.trim()) payload.name = name.trim();

    await apiClient.post("/api/users", payload);

    const loginResponse = await apiClient.post("/api/auth/login", { email, password });
    const { token: authToken, user: userData } = loginResponse.data;
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(userData);
    navigate("/");
    return userData;
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/signin");
  };

  const isAuthenticated = !!token && isTokenValid(token);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
