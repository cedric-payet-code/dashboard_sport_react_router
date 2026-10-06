import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { login as loginApi } from "../services/api";
import { isAuthenticated } from "../utils/auth";
import logo from "../assets/logo.svg";
import backgroundPicture from "../assets/background-picture.svg";
import styles from "./login.module.css";

// Un utilisateur déjà connecté n'a rien à faire sur la page de connexion
export function clientLoader() {
  if (isAuthenticated()) {
    throw redirect("/profil");
  }
  return null;
}

export function meta() {
  return [{ title: "Connexion - SportSee" }];
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const data = await loginApi(username, password);
      login(data.token);
      navigate("/profil");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.left}>
        <img src={logo} alt="SportSee" className={styles.logo} />

        <form onSubmit={handleSubmit} className={styles.card}>
          <h1 className={styles.title}>
            Transformez
            <br />
            vos stats en résultats
          </h1>
          <h2 className={styles.subtitle}>Se connecter</h2>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <label className={styles.field}>
            Adresse email
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className={styles.field}>
            Mot de passe
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className={styles.button} disabled={submitting}>
            {submitting ? "Connexion..." : "Se connecter"}
          </button>

          <a href="#" className={styles.forgot}>
            Mot de passe oublié ?
          </a>
        </form>
      </section>

      <section
        className={styles.right}
        style={{ backgroundImage: `url(${backgroundPicture})` }}
      >
        <p className={styles.tagline}>
          Analysez vos performances en un clin d’œil,
          <br />
          suivez vos progrès et atteignez vos objectifs.
        </p>
      </section>
    </main>
  );
}
