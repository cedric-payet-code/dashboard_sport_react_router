import ProfileCard from "../components/ProfileCard";
import DistanceChart from "../components/DistanceChart";
// import { useUserInfo } from "../hooks/useUserInfo";
// import { formatHeight, formatTotalDuration } from "../utils/formatters";
import styles from "./Dashboard.module.css"
import HeartRateChart from "../components/HeartRateChart";

export default function Dashboard() {

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
    </div>
  );
}