import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getUrls } from "../modules/api/UrlApi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, } from "recharts";
export default function Dashboard() {
    const [urls, setUrls] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [totalUrls, setTotalUrls] = useState(0);
    useEffect(() => {
        (async () => {
            const data = await getUrls();
            setUrls(data);
            setTotalUrls(data.length);
            setTotalClicks(data.reduce((sum, u) => sum + (u.clicks || 0), 0));
        })();
    }, []);
    const topUrls = [...urls]
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5)
        .map((u) => ({
        name: u.shortUrl.replace("http://localhost:5000/", ""),
        clicks: u.clicks,
    }));
    const lineData = urls.map((u, i) => ({
        name: `URL ${i + 1}`,
        clicks: u.clicks,
    }));
    return (_jsxs("div", { style: {
            padding: "2rem",
            maxWidth: "1100px",
            margin: "0 auto",
            fontFamily: "Segoe UI, sans-serif",
        }, children: [_jsx("h2", { style: { textAlign: "center", color: "#333" }, children: "\uD83D\uDCCA Analytics Dashboard" }), _jsx("p", { style: { textAlign: "center", color: "#777" }, children: "Insights about your shortened URLs" }), _jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                    margin: "2rem 0",
                    flexWrap: "wrap",
                }, children: [_jsxs("div", { style: cardStyle, children: [_jsx("h3", { children: "Total URLs" }), _jsx("p", { style: metricStyle, children: totalUrls })] }), _jsxs("div", { style: cardStyle, children: [_jsx("h3", { children: "Total Clicks" }), _jsx("p", { style: metricStyle, children: totalClicks })] })] }), _jsxs("div", { style: {
                    display: "flex",
                    gap: "2rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }, children: [_jsxs("div", { style: chartContainer, children: [_jsx("h3", { style: chartTitle, children: "\uD83C\uDFC6 Top 5 URLs by Clicks" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: topUrls, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "clicks", fill: "#007bff" })] }) })] }), _jsxs("div", { style: chartContainer, children: [_jsx("h3", { style: chartTitle, children: "\uD83D\uDCC8 Clicks per URL" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: lineData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "clicks", stroke: "#28a745", strokeWidth: 2 })] }) })] })] })] }));
}
const cardStyle = {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.5rem 3rem",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "250px",
};
const metricStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#007bff",
    margin: 0,
};
const chartContainer = {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "1rem 1.5rem",
    width: "500px",
};
const chartTitle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "1rem",
};
