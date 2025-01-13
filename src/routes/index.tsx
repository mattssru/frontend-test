import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "../pages/user";
import AdminPage from "../pages/admin";
import Layout from "../components/Layout";
import LoginPage from "../pages/auth/LoginPages";
import { useAuth } from "../context/AuthProvider";

const AppRoutes: React.FC = () => {
  const { isAdminLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAdminLoggedIn ? <Navigate to="/admin" replace /> : <LoginPage />
        }
      />
      <Route element={<Layout />}>
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
