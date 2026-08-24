import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Interface() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
