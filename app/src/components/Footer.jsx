import styles from "./Footer.module.css";
import logo from "../assets/logo_footer.svg";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <p>©Sportsee Tous droits réservés</p>
        <div>
          <a href="#">Conditions générales</a>
          <a href="#">Contact</a>
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </footer>
  );
}