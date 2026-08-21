import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../utils/apiClient";

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
        .get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          // Token is invalid, clear it
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
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

    const { token: authToken, user: userData } = response.data;
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(userData);
    navigate("/");
    return userData;
  };

  const signUp = async (name, email, password) => {
    // Only include name if it's non-empty (name is optional in backend)
    const payload = { email, password };
    if (name && name.trim()) {
      payload.name = name.trim();
    }

    // Register user
    await apiClient.post("/api/users", payload);

    // Sign in to get token (users API doesn't return token on registration)
    const loginResponse = await apiClient.post("/api/auth/login", {
      email,
      password,
    });

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
