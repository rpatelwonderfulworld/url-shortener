import { useEffect, useState } from "react";
import { getUrls } from "../modules/api/UrlApi";

interface UrlRecord {
  id: number;
  longUrl: string;
  shortUrl: string;
  clicks: number;
}

export default function Urls() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    (async () => {
      try {
        const data = await getUrls();
        setUrls(data);
      } catch (err) {
        setError("Failed to load URLs");
      }
    })();
  }, []);

  const handleCopy = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  const filteredUrls = urls
    .filter((u) =>
      u.longUrl.toLowerCase().includes(search.toLowerCase()) ||
      u.shortUrl.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.clicks - b.clicks : b.clicks - a.clicks
    );

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "950px",
        margin: "0 auto",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "0.5rem" }}>
        📋 My Shortened URLs
      </h2>
      <p style={{ textAlign: "center", color: "#777", marginBottom: "1rem" }}>
        Track, search, and analyze your shortened links easily.
      </p>

      {/* Search bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search URLs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "70%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={toggleSort}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Sort by Clicks ({sortOrder === "asc" ? "↑" : "↓"})
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredUrls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#007bff", color: "white" }}>
            <tr>
              <th style={{ padding: "10px", textAlign: "left", width: "45%" }}>Long URL</th>
              <th style={{ padding: "10px", textAlign: "left", width: "30%" }}>Short URL</th>
              <th style={{ padding: "10px", width: "10%" }}>Clicks</th>
              <th style={{ padding: "10px", width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUrls.map((u, i) => (
              <tr
                key={u.id}
                style={{
background: i % 2 === 0 ? "#fafafa" : "#fff",
borderBottom: "1px solid #eee",
transition: "background 0.3s",
                }}
              >
                <td style={{ padding: "10px" }}>{u.longUrl}</td>
                <td style={{ padding: "10px" }}>{u.shortUrl}</td>
                <td style={{ padding: "10px" }}>{u.clicks}</td>
                <td style={{ padding: "10px" }}>
                  <button onClick={() => handleCopy(u.shortUrl)}>Copy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
