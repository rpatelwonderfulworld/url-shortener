import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
export default function TopBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
    };
    return (_jsxs("header", { style: {
            background: "white",
            borderBottom: "1px solid #e2e8f0",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }, children: [_jsxs("nav", { style: { display: "flex", gap: "1rem" }, children: [_jsx(Link, { to: "/", children: "Home" }), _jsx(Link, { to: "/urls", children: "My URLs" }), _jsx(Link, { to: "/dashboard", children: "Dashboard" })] }), _jsx("div", { children: token ? (_jsxs(_Fragment, { children: [_jsx("span", { style: { marginRight: "1rem" }, children: email }), _jsx("button", { onClick: logout, children: "Logout" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", children: "Login" }), _jsx(Link, { to: "/register", children: "Register" })] })) })] }));
}
