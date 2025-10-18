import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("token", "fake-jwt");
        localStorage.setItem("email", email);
        nav("/");
    };
    return (_jsxs("div", { style: { maxWidth: "400px", margin: "2rem auto" }, children: [_jsx("h2", { children: "Register" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { children: "Email" }), _jsx("input", { style: { width: "100%", marginBottom: "1rem" }, value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("label", { children: "Password" }), _jsx("input", { style: { width: "100%", marginBottom: "1rem" }, type: "password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: "submit", children: "Register" })] }), _jsxs("p", { children: ["Already have an account? ", _jsx(Link, { to: "/login", children: "Login" })] })] }));
}
