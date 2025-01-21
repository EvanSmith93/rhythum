import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./components/layout";
import Register from "./pages/register";
import JoinSession from "./pages/joinSession";
import Dashboard from "./pages/dashboard";
import DashboardNavbar from "./components/dashboardNavbar";
import SessionDetail from "./pages/sessionDetail";
import "./styles/main.css";
import "./styles/form.css";
import "./styles/dashboard.css";
import "./styles/session.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/join-session" element={<JoinSession />} />
          <Route path="/session" element={<SessionDetail />} />
        </Route>
        <Route element={<Layout navbar={<DashboardNavbar />} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
