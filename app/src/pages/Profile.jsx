import ProfileCard from "../components/ProfileCard";
import { useUserInfo } from "../hooks/useUserInfo";
import { formatGender, formatHeight, formatTotalDuration } from "../utils/formatters";
import styles from "./Profile.module.css"

export default function Dashboard() {
  const { userInfo, loading, error } = useUserInfo();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!userInfo) return null;

  const { profile, statistics } = userInfo;
  const { hours, minutes } = formatTotalDuration(statistics.totalDuration);

  const createdAtFormatted = new Date(profile.createdAt).toLocaleDateString("fr-FR", { //fusionner avec la page profile ?
        day: "numeric",
        month: "long",
        year: "numeric"
    });

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileColumn}>
        <ProfileCard/>
        <div className={styles.myProfile}>
          <h2>Votre profil</h2>
          <hr/>
          <p>Âge : {profile.age}</p>
          <p>Genre : {formatGender(profile.gender)}</p>
          <p>Taille : {formatHeight(profile.height)}</p>
          <p>Poids : {profile.weight}kg</p>
        </div>
      </div>
      <div className={styles.statisticsColumn}>
        <div className={styles.myStatistics}>
          <h2>Vos statistiques</h2>
          <p>depuis le {createdAtFormatted}</p>
        </div>
        <div className={styles.statisticsCards}>
          <div className={styles.statisticsCard}>
            <h3>Temps total couru</h3>
            <span>{hours}h <p>{minutes}min</p></span>
          </div>
          <div className={styles.statisticsCard}>
            <h3>Calories brûlées</h3>
            <span>{statistics.totalCaloriesBurned} <p>cal</p></span>
          </div>
          <div className={styles.statisticsCard}>
            <h3>Distance totale parcourue</h3>
            <span>{statistics.totalDistance} <p>km</p></span>
          </div>
          <div className={styles.statisticsCard}>
            <h3>Nombre de jours de repos</h3>
            <span>{statistics.restDays} <p>jours</p></span>
          </div>
          <div className={styles.statisticsCard}>
            <h3>Nombre de sessions</h3>
            <span>{statistics.totalSessions} <p>sessions</p></span>
          </div>
        </div>
      </div>
    </div>
  );
}