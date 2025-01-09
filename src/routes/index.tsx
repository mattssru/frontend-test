import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import UserPage from "../pages/user";
import AdminPage from "../pages/admin";
import Layout from "../components/Layout";
import LoginPage from "../pages/auth/LoginPages";

const AppRoutes: React.FC = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "1234") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", "true");
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAdminLoggedIn ? (
            <Navigate to="/admin" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        element={<Layout isAdmin={isAdminLoggedIn} onLogout={handleLogout} />}
      >
        <Route path="/user" element={<UserPage />} />

        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? <AdminPage /> : <Navigate to="/login" replace />
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
