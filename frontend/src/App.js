import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home/HomePage';
import Signup from "./pages/Home/SignupPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/inscription">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
