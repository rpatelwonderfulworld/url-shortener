import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Urls from "./pages/Urls";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { auth } from "./modules/auth/auth";

function RequireAuth({ children }: { children:  React.ReactNode  }) {
  const loc = useLocation();
  if (!auth.isAuthed()) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}

export default function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urls" element={<RequireAuth><Urls /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
