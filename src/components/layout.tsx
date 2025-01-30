import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

export default function Layout({ navbar }: { navbar?: ReactNode }) {
  return (
    <div id="layout">
      <Header navbar={navbar} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
