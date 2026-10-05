import { useState, useEffect } from "react";
import { useUserActivity } from "../hooks/useUserActivity";
import { getCurrentWeekRange } from "../utils/activityAgregator";
import styles from "./WeeklyStats.module.css";

export default function WeeklyStats() {
  const { fetchActivity } = useUserActivity();
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { start, end } = getCurrentWeekRange();
      const sessions = await fetchActivity(start, end);
      setDuration(sessions.reduce((total, session) => total + session.duration, 0));
      setDistance(sessions.reduce((total, session) => total + session.distance, 0));
    }
    loadData();
  }, []);

  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <p className={styles.title}>Durée d'activité</p>
        <p className={styles.value}>
          <span className={styles.durationValue}>{duration}</span>
          <span className={styles.durationUnit}>minutes</span>
        </p>
      </div>
      <div className={styles.card}>
        <p className={styles.title}>Distance</p>
        <p className={styles.value}>
          <span className={styles.distanceValue}>{Math.round(distance * 10) / 10}</span>
          <span className={styles.distanceUnit}>kilomètres</span>
        </p>
      </div>
    </div>
  );
}
