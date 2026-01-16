import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import FloatingDarkToggle from "./FloatingDarkToggle";

function Layout() {
  return (
    <>
      <ScrollProgress />
      <FloatingDarkToggle />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
