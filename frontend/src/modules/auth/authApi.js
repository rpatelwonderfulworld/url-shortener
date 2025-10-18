import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
export async function login(email, password) {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    const token = res.data.access_token;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    return token;
}
