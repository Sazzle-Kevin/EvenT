import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Interface() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
