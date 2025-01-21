import { Outlet } from "react-router-dom";
import Header from "./header";
import "../styles/main.css";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
