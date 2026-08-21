import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { AuthProvider } from "../contexts/AuthContext";

export default function Interface() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
