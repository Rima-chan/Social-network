import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home/HomePage';
import AllPosts from './pages/AllPosts/AllPostsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/accueil">
          <AllPosts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
