import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getUrls } from "../modules/api/UrlApi";
export default function Urls() {
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    useEffect(() => {
        (async () => {
            try {
                const data = await getUrls();
                setUrls(data);
            }
            catch (err) {
                setError("Failed to load URLs");
            }
        })();
    }, []);
    const handleCopy = async (shortUrl) => {
        await navigator.clipboard.writeText(shortUrl);
        alert("Copied!");
    };
    const filteredUrls = urls
        .filter((u) => u.longUrl.toLowerCase().includes(search.toLowerCase()) ||
        u.shortUrl.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sortOrder === "asc" ? a.clicks - b.clicks : b.clicks - a.clicks);
    const toggleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
    return (_jsxs("div", { style: {
            padding: "2rem",
            maxWidth: "950px",
            margin: "0 auto",
            fontFamily: "Segoe UI, sans-serif",
        }, children: [_jsx("h2", { style: { textAlign: "center", color: "#333", marginBottom: "0.5rem" }, children: "\uD83D\uDCCB My Shortened URLs" }), _jsx("p", { style: { textAlign: "center", color: "#777", marginBottom: "1rem" }, children: "Track, search, and analyze your shortened links easily." }), _jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "1rem" }, children: [_jsx("input", { type: "text", placeholder: "Search URLs...", value: search, onChange: (e) => setSearch(e.target.value), style: {
                            width: "70%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                        } }), _jsxs("button", { onClick: toggleSort, style: {
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }, children: ["Sort by Clicks (", sortOrder === "asc" ? "↑" : "↓", ")"] })] }), error && _jsx("p", { style: { color: "red" }, children: error }), filteredUrls.length === 0 ? (_jsx("p", { children: "No URLs found." })) : (_jsxs("table", { style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                }, children: [_jsx("thead", { style: { background: "#007bff", color: "white" }, children: _jsxs("tr", { children: [_jsx("th", { style: { padding: "10px", textAlign: "left", width: "45%" }, children: "Long URL" }), _jsx("th", { style: { padding: "10px", textAlign: "left", width: "30%" }, children: "Short URL" }), _jsx("th", { style: { padding: "10px", width: "10%" }, children: "Clicks" }), _jsx("th", { style: { padding: "10px", width: "10%" }, children: "Action" })] }) }), _jsx("tbody", { children: filteredUrls.map((u, i) => (_jsxs("tr", { style: {
                                background: i % 2 === 0 ? "#fafafa" : "#fff",
                                borderBottom: "1px solid #eee",
                                transition: "background 0.3s",
                            }, children: [_jsx("td", { style: { padding: "10px" }, children: u.longUrl }), _jsx("td", { style: { padding: "10px" }, children: u.shortUrl }), _jsx("td", { style: { padding: "10px" }, children: u.clicks }), _jsx("td", { style: { padding: "10px" }, children: _jsx("button", { onClick: () => handleCopy(u.shortUrl), children: "Copy" }) })] }, u.id))) })] }))] }));
}
