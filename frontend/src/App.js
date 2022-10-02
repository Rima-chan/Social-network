import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { isAuth } from "./utils/services/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo={"/"}>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

function RequireAuth({ children, redirectTo }) {
  const isAuthentificated = isAuth();
  return isAuthentificated ? children : <Navigate to={redirectTo} />;
}

export default App;
