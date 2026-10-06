import { useUserInfo } from "../../hooks/useUserInfo";
import styles from "./style.module.css"
import achievement from '../../assets/achievement.svg'

export default function ProfileCard({ showTotalDistance = false }) {
    const { userInfo, loading, error } = useUserInfo();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!userInfo) return null;

    const { profile, statistics } = userInfo; //se débarasser de statistics qui n'est pas utile ?

    const createdAtFormatted = new Date(profile.createdAt).toLocaleDateString("fr-FR", { //fusionner avec la page profile ?
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <div className={`${styles.profileCard} ${showTotalDistance ? styles.withTotalDistance : ""}`}>
            <div className={styles.profilSection}>
                <div className={styles.photoWrapper}>
                    <img src={profile.profilePicture}></img>
                </div>
                <div className={styles.profileCardDetail}>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                    <p>Membre depuis le {createdAtFormatted}</p>
                </div>
            </div>

            {showTotalDistance && (
                <div className={styles.distanceSection}>
                    <p>Distance totale parcourue</p>
                    <div className={styles.statisticsCard}>
                        <img src={achievement}></img>
                        <p>
                            {statistics.totalDistance} km
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}