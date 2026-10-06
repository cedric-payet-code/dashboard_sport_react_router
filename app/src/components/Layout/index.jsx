import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./style.module.css";

export default function Layout() {
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