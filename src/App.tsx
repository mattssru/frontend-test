import React from "react";
import AppRoutes from "./routes";
import { RegistrationProvider } from "./context/RegistrationProvider";
// import { CustomProvider } from "rsuite";
import "./App.css";

const App: React.FC = () => {
  return (
    <RegistrationProvider>
      <AppRoutes />
    </RegistrationProvider>
  );
};

export default App;
