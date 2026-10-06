// app/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login as loginApi } from "../services/api";
import logo from "../assets/logo.svg";
import backgroundPicture from "../assets/background-picture.svg";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginApi(username, password);
      login(data.token);
      navigate("/profil");
    } catch (err) {
      setError(err.message);
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

          {error && <p className={styles.error}>{error}</p>}

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

          <button type="submit" className={styles.button}>
            Se connecter
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
