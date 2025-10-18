import { useEffect, useState } from "react";
import { getUrls } from "../modules/api/UrlApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface UrlRecord {
  id: number;
  longUrl: string;
  shortUrl: string;
  clicks: number;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalUrls, setTotalUrls] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getUrls();
      setUrls(data);
      setTotalUrls(data.length);
      setTotalClicks(data.reduce((sum: number, u: UrlRecord) => sum + (u.clicks || 0), 0));
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

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1100px",
        margin: "0 auto",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>📊 Analytics Dashboard</h2>
      <p style={{ textAlign: "center", color: "#777" }}>
        Insights about your shortened URLs
      </p>

      {/* Summary cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          margin: "2rem 0",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>Total URLs</h3>
          <p style={metricStyle}>{totalUrls}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Clicks</h3>
          <p style={metricStyle}>{totalClicks}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Top URLs by clicks */}
        <div style={chartContainer}>
          <h3 style={chartTitle}>🏆 Top 5 URLs by Clicks</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topUrls}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Click trend */}
        <div style={chartContainer}>
          <h3 style={chartTitle}>📈 Clicks per URL</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#28a745" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "10px",
  padding: "1.5rem 3rem",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  width: "250px",
};

const metricStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#007bff",
  margin: 0,
};

const chartContainer: React.CSSProperties = {
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  padding: "1rem 1.5rem",
  width: "500px",
};

const chartTitle: React.CSSProperties = {
  textAlign: "center",
  color: "#333",
  marginBottom: "1rem",
};
