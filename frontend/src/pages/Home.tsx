import UrlForm from "../components/UrlForm";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>URL Shortener</h1>
      <UrlForm />
    </div>
  );
}
