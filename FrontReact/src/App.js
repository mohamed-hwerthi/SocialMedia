import { Home } from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/register.jsx";
import PageNotFound from "./pages/notFound/notFound.jsx";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/profile/:username" element={<Profile />}></Route>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
