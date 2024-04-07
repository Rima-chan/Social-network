import React, { createContext, useContext, useEffect } from "react";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../services/localStorage";
import { useNavigate } from "react-router-dom";

type AuthContextProps = {
  token: string | null;
  onLogin: (token: string | null) => void;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  onLogin: () => {},
  onLogout: () => {},
});

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | null>(null);

  const handleLogin = (token: string | null) => {
    saveToLocalStorage("xToken", token);
    setToken(token);
    navigate("/home");
  };

  useEffect(() => {
    const token = loadFromLocalStorage("xToken", null);
    handleLogin(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    removeFromLocalStorage("xToken");
    removeFromLocalStorage("user");
    setToken(null);
    navigate("/");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
