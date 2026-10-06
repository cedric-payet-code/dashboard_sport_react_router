import styles from "./style.module.css";

// Affiche un message de chargement ou d'erreur à la place du contenu (graphique, chiffres...)
// `minHeight` permet de garder la hauteur du contenu pour que la carte ne saute pas
export default function DataStatus({ loading, error, minHeight, children }) {
  if (error) {
    return (
      <p className={`${styles.status} ${styles.error}`} style={{ minHeight }} role="alert">
        {error}
      </p>
    );
  }

  if (loading) {
    return (
      <p className={styles.status} style={{ minHeight }} aria-live="polite">
        Chargement...
      </p>
    );
  }

  return children;
}
