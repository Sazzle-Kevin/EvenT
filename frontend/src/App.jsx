import { Route, Routes } from "react-router";
import Interface from "./components/Interface";
import Home from "./pages/Home";
import Event from "./pages/Event";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen w-full bg-background text-text">
      <Routes>
        <Route path="/" element={<Interface />}>
          <Route index element={<Home />} />
          <Route path="events/:id" element={<Event />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="create-event" element={<CreateEvent />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
