import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="nav-bar">
        <h1 className="header-title">NC NEWS</h1>
      <div className="nav-links">
        <Link to="/articles">Articles</Link>
      </div>
    </nav>
  );
}
