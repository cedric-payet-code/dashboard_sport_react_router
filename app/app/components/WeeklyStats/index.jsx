import { useActivitySessions } from "../../hooks/useActivitySessions";
import { getCurrentWeekRange } from "../../utils/activityAgregator";
import DataStatus from "../DataStatus";
import styles from "./style.module.css";

export default function WeeklyStats() {
  const { start, end } = getCurrentWeekRange();
  const { sessions, loading, error } = useActivitySessions(start, end);

  const duration = sessions.reduce((total, session) => total + session.duration, 0);
  const distance = sessions.reduce((total, session) => total + session.distance, 0);

  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <p className={styles.title}>Durée d'activité</p>
        <DataStatus loading={loading} error={error}>
          <p className={styles.value}>
            <span className={styles.durationValue}>{duration}</span>
            <span className={styles.durationUnit}>minutes</span>
          </p>
        </DataStatus>
      </div>
      <div className={styles.card}>
        <p className={styles.title}>Distance</p>
        <DataStatus loading={loading} error={error}>
          <p className={styles.value}>
            <span className={styles.distanceValue}>{Math.round(distance * 10) / 10}</span>
            <span className={styles.distanceUnit}>kilomètres</span>
          </p>
        </DataStatus>
      </div>
    </div>
  );
}
