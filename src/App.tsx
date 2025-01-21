import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./components/layout";
import Register from "./pages/register";
import JoinSession from "./pages/joinSession";
import "./styles/main.css";
import "./styles/form.css";
import SessionList from "./pages/sessionList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/join-session" element={<JoinSession />} />
          <Route path="/session-list" element={<SessionList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
