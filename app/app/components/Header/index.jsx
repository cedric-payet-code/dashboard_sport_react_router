import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import styles from "./style.module.css";
import logo from "../../assets/logo.svg";

export default function Header() {
  // La redirection vers /login est faite par le layout des routes protégées
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <img src={logo} alt="SportSee" />

      <nav>
        <Link className={styles.link} to="/dashboard">Dashboard</Link>
        <Link className={styles.link} to="/profil">Mon profil</Link>
        <span/>
        <button onClick={logout}>Se déconnecter</button>
      </nav>
    </header>
  );
}
