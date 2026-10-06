import { Navigate, Outlet, redirect } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { isAuthenticated } from "../utils/auth";
import styles from "./protected-layout.module.css";

// Exécuté avant l'affichage de toute route enfant : sans token, retour à la connexion
export function clientLoader() {
  if (!isAuthenticated()) {
    throw redirect("/login");
  }
  return null;
}

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  // Déconnexion (bouton du header ou token refusé par l'API) pendant que la page est affichée
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
