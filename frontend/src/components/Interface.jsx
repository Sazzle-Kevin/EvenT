import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Interface() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
