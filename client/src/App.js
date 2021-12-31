
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  const NewLandingPage = Auth(LandingPage, null)
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  return (
    <Router>
    <div>
    <nav>
    <ul>
    <li>
    <Link to="/">Home</Link>
    </li>
    <li>
    <Link to="/login">Login</Link>
    </li>
    <li>
    <Link to="/register">Register</Link>
    </li>
    </ul>
    </nav>

    {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}


      <Routes>
      //specific component,
      //2nd option can be null (anyone can visit), true (only logined user can visit), false (loginned user cant visit)
      <Route path="/" element={<NewLandingPage />} />
      <Route path="/login" element={<NewLoginPage />} />
      <Route path="/register" element={<NewRegisterPage />} />
      </Routes>

      </div>
      </Router>
    );
  }

  export default App;
