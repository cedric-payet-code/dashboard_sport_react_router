import ProfileCard from "../components/ProfileCard";
import DistanceChart from "../components/DistanceChart";
import HeartRateChart from "../components/HeartRateChart";
import WeeklyGoalCard from "../components/WeeklyGoalCard";
import WeeklyStats from "../components/WeeklyStats";
import { getCurrentWeekRange } from "../utils/activityAgregator";
import { formatShortDate } from "../utils/formatters";
import styles from "./dashboard.module.css"

export function meta() {
  return [{ title: "Dashboard - SportSee" }];
}

export default function Dashboard() {
  const currentWeek = getCurrentWeekRange();

  return (
    <div className={styles.dashboardPage}>
      <ProfileCard showTotalDistance={true}/>
      <div className={styles.statisticsSection}>
        <h2>Vos dernières performances</h2>
        <div className={styles.graphicsSection}>
          <DistanceChart/>
          <HeartRateChart/>
        </div>
      </div>
      <div className={styles.statisticsSection}>
        <h2>Cette semaine</h2>
        <p className={styles.weekRange}>
          Du {formatShortDate(currentWeek.start)} au {formatShortDate(currentWeek.end)}
        </p>
        <div className={styles.graphicsSection}>
          <WeeklyGoalCard/>
          <WeeklyStats/>
        </div>
      </div>
    </div>
  );
}
