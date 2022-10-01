import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AllPosts from "./pages/AllPosts/AllPostsPage";
import Home from "./pages/Home/HomePage";
import { isAuth } from "./utils/services/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="accueil/"
          element={
            <RequireAuth redirectTo={"/"}>
              <AllPosts />
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
