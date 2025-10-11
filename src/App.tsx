import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import VerifyEmailSent from "./pages/VerifyEmailSent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/verify-email-sent" element={ <VerifyEmailSent /> } />
        <Route path="/verify" element={ <Verify /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
        {/* Redirect all unknown routes to login */ }
        <Route path="*" element={ <Navigate to="/login" replace /> } />
      </Routes>
    </Router>
  );
}

export default App;
