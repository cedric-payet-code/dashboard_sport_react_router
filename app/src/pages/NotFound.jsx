import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <img src={logo} alt="SportSee" className={styles.logo} />

      <section className={styles.card}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Oups ! La page que vous cherchez n’existe pas.</p>
        <Link to="/" className={styles.button}>
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
