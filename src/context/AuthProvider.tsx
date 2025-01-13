/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAdminLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "Matt1234") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
