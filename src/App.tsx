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
import { createContext, useEffect, useState } from "react";
import { User } from "./utils/types";

type UserContextProps = {
  user: User | null;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextProps>({
  user: null,
  refreshUser: async () => {},
});

function App() {
  const db = new ClientDb();
  const [user, setUser] = useState<User | null>(null);

  async function refreshUser() {
    const user = await db.getCurrentUser();
    console.log('refreshing', user);
    setUser(user);
  }

  useEffect(() => {
    refreshUser();
  }, []);

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
