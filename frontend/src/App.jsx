import { Route, Routes } from "react-router";
import "./App.css";
import Interface from "./components/Interface";
import Event from "./components/Event";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Interface />}>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
