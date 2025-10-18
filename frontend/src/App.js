import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Urls from "./pages/Urls";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { auth } from "./modules/auth/auth";
function RequireAuth({ children }) {
    const loc = useLocation();
    if (!auth.isAuthed())
        return _jsx(Navigate, { to: "/login", state: { from: loc }, replace: true });
    return children;
}
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsx(TopBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/urls", element: _jsx(RequireAuth, { children: _jsx(Urls, {}) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(RequireAuth, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }));
}
