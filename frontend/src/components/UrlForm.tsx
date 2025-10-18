import { useState } from "react";
import { shortenUrl } from "../modules/api/UrlApi";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      if (!url.startsWith("http")) {
        setError("Please enter a valid URL starting with http or https");
        return;
      }

      const res = await shortenUrl(url);
      setShortUrl(`${window.location.origin}/${res.slug}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error shortening URL");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
        <input
          className="input"
          placeholder="Enter a long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="button" type="submit">
          Shorten
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
