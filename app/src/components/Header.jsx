import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "./Header.module.css";
import logo from "../assets/logo.svg";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" />

      <nav>
        <Link className={styles.link} to="/dashboard">Dashboard</Link>
        <Link className={styles.link} to="/profil">Mon profil</Link>
        <span/>
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
}