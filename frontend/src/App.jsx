import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './utils/store.js';
import Home from './pages/Home/HomePage';
import AllPosts from './pages/AllPosts/AllPostsPage';
import { isAuth } from './utils/services/auth';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="accueil/" element={
            <RequireAuth redirectTo={"/"}>
              <AllPosts />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

function RequireAuth({children, redirectTo}) {
  let isAuthentificated = isAuth();
  return isAuthentificated ? children : <Navigate to={redirectTo}/>
}

export default App;
