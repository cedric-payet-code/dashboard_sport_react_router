import ProfileCard from "../components/ProfileCard";
import DistanceChart from "../components/DistanceChart";
// import { useUserInfo } from "../hooks/useUserInfo";
// import { formatHeight, formatTotalDuration } from "../utils/formatters";
import styles from "./Dashboard.module.css"
import HeartRateChart from "../components/HeartRateChart";
import WeeklyGoalCard from "../components/WeeklyGoalCard";
import WeeklyStats from "../components/WeeklyStats";
import { getCurrentWeekRange } from "../utils/activityAgregator";

// "2025-06-23" -> "23/06/2025"
function formatDate(isoDate) {
  return isoDate.split("-").reverse().join("/");
}

export default function Dashboard() {
  const currentWeek = getCurrentWeekRange();

  return (
    <div className={styles.dashboardPage}>
      <ProfileCard showTotalDistance={true}/>
      <div className={styles.statisticsSection}>
        <h2>Vos dernières performances</h2>
        <div className={styles.graphicsSection}>
          <DistanceChart className={styles.test}/>
          <HeartRateChart/>
        </div>
      </div>
      <div className={styles.statisticsSection}>
        <h2>Cette semaine</h2>
        <p className={styles.weekRange}>
          Du {formatDate(currentWeek.start)} au {formatDate(currentWeek.end)}
        </p>
        <div className={styles.graphicsSection}>
          <WeeklyGoalCard/>
          <WeeklyStats/>
        </div>
      </div>
    </div>
  );
}