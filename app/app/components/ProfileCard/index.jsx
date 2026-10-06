import { useUserInfo } from "../../hooks/useUserInfo";
import { formatLongDate } from "../../utils/formatters";
import DataStatus from "../DataStatus";
import styles from "./style.module.css"
import achievement from '../../assets/achievement.svg'

export default function ProfileCard({ showTotalDistance = false }) {
    const { userInfo, loading, error } = useUserInfo();

    if (loading || error || !userInfo) {
        return (
            <div className={styles.profileCard}>
                <DataStatus loading={loading} error={error} />
            </div>
        );
    }

    const { profile, statistics } = userInfo;

    return (
        <div className={`${styles.profileCard} ${showTotalDistance ? styles.withTotalDistance : ""}`}>
            <div className={styles.profilSection}>
                <div className={styles.photoWrapper}>
                    <img src={profile.profilePicture} alt={`${profile.firstName} ${profile.lastName}`} />
                </div>
                <div className={styles.profileCardDetail}>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                    <p>Membre depuis le {formatLongDate(profile.createdAt)}</p>
                </div>
            </div>

            {showTotalDistance && (
                <div className={styles.distanceSection}>
                    <p>Distance totale parcourue</p>
                    <div className={styles.statisticsCard}>
                        <img src={achievement} alt="" />
                        <p>
                            {statistics.totalDistance} km
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
