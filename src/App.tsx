import React from "react";
import AppRoutes from "./routes";
import { RegistrationProvider } from "./context/RegistrationProvider";
// import { CustomProvider } from "rsuite";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RegistrationProvider>
        <AppRoutes />
      </RegistrationProvider>
    </AuthProvider>
  );
};

export default App;
