import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiClient, API_BASE_URL } from "../utils/apiClient";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if token exists in localStorage on load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Verify token and fetch user data
      apiClient
        .get("/api/users/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          // Token is invalid, clear it
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    const response = await apiClient.post("/api/auth/login", {
      email,
      password,
    });

    const { token: authToken, ...userData } = response.data;
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(userData);
    navigate("/");
    return userData;
  };

  const signUp = async (name, email, password) => {
    const response = await apiClient.post("/api/users", {
      name,
      email,
      password,
    });

    const { token: authToken, ...userData } = response.data;
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

  const isAuthenticated = !!token;

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
