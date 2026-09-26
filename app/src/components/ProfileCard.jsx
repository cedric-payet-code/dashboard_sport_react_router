import { useUserInfo } from "../hooks/useUserInfo";
import styles from "./ProfileCard.module.css"

export default function ProfileCard() {
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
        <div className={styles.profileCard}>
            <img src={profile.profilePicture}></img>
            <div className={styles.profileCardDetail}>
                <h1>{profile.firstName} {profile.lastName}</h1>
                <p>Membre depuis le {createdAtFormatted}</p>
            </div>
        </div>
    );
}