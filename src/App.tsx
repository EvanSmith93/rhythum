import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { ClientDb } from "./services/clientDb";
import { useCallback, useEffect, useState } from "react";
import { User } from "./utils/types";
import { UserContext } from "./hooks/useUser";

function App() {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") ?? "null")
  );

  const refreshUser = useCallback(async () => {
    const db = new ClientDb();
    const user = await db.getCurrentUser();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, refreshUser }}>
        <Routes>
          {user ? AuthenticatedRoutes() : UnauthenticatedRoutes()}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

function AuthenticatedRoutes() {
  return (
    <>
      <Route element={<Layout />}>
        <Route path="/join-session" element={<JoinSession />} />
        <Route path="/sessions/:sessionId" element={<SessionDetail />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Route>
      <Route element={<Layout navbar={<DashboardNavbar />} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Route element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Route>
  );
}

export default App;
