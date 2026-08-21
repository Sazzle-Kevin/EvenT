import { Routes, Route, Navigate } from "react-router";
import Interface from "./components/Interface";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import ProtectedRoute, { PublicRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Protected routes - require authentication */}
      <Route element={<ProtectedRoute />}>
        <Route path="/events/create" element={<CreateEvent />} />
      </Route>

      {/* Auth pages - only accessible when NOT authenticated */}
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Public routes - wrapped with Interface layout */}
      <Route element={<Interface />}>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<Event />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
