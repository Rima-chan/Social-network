import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./utils/context/auth";
import { SnackbarProvider } from "./utils/context/snackbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
