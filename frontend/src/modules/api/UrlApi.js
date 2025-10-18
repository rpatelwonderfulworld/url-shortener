import axios from "axios";
import { auth } from "../auth/auth";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
export async function shortenUrl(url) {
    const token = auth.getToken(); // ✅ Fetch saved token
    const res = await axios.post(`${API_BASE}/url/shorten`, { url }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}
export async function getUrls() {
    const token = auth.getToken();
    const res = await axios.get(`${API_BASE}/url`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    // Normalize the response so shortUrl always exists
    const urls = res.data.map((u) => ({
        id: u.id,
        longUrl: u.longUrl,
        shortUrl: u.shortUrl || `${API_BASE}/url/${u.slug}`,
        clicks: u.clicks || 0,
    }));
    return urls;
}
