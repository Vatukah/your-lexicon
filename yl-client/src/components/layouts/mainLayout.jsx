import { Outlet } from "react-router";
import Footer from "../footer";
import Navbar from "../navbar/navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen ">
      <header className="bg-white shadow sticky top-0 left-0 z-50">
        <Navbar />
      </header>
      <main >
        <Outlet />
      </main>
      <footer className="bg-white shadow">
        <Footer />
      </footer>
    </div>
  );
}
