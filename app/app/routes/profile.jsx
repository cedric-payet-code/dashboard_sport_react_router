import ProfileCard from "../components/ProfileCard";
import { useUserInfo } from "../hooks/useUserInfo";
import DataStatus from "../components/DataStatus";
import { formatGender, formatHeight, formatLongDate, formatTotalDuration } from "../utils/formatters";
import styles from "./profile.module.css"

export function meta() {
  return [{ title: "Mon profil - SportSee" }];
}

export default function Profile() {
  const { userInfo, loading, error } = useUserInfo();

  if (loading || error || !userInfo) {
    return <DataStatus loading={loading} error={error} minHeight="50vh" />;
  }

  const { profile, statistics } = userInfo;
  const { hours, minutes } = formatTotalDuration(statistics.totalDuration);
  const createdAtFormatted = formatLongDate(profile.createdAt);

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