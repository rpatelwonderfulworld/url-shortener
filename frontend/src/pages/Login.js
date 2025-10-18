import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { login } from "../modules/auth/authApi";
import { auth } from "../modules/auth/auth";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            auth.login(token, email); // ✅ Save token for later
            navigate("/"); // ✅ Redirect to home
        }
        catch {
            setError("Invalid credentials");
        }
    };
    return (_jsxs("div", { style: { padding: "2rem" }, children: [_jsx("h2", { children: "Login" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("br", {}), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("br", {}), _jsx("button", { type: "submit", children: "Login" })] }), error && _jsx("p", { style: { color: "red" }, children: error })] }));
}
