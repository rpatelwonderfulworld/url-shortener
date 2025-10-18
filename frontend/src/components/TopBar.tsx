import { Link, useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/urls">My URLs</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div>
        {token ? (
          <>
            <span style={{ marginRight: "1rem" }}>{email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
