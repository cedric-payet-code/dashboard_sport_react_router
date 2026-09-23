import { useUserInfo } from "../context/UserInfoContext";

export default function Dashboard() {
  const { userInfo, loading, error } = useUserInfo();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!userInfo) return null;

  const { profile, statistics } = userInfo;

  return (
    <div>
      <p>{profile.firstName} {profile.lastName}</p>
      <p>Membre de puis le {profile.createdAt}</p>
      <p>Votre profil</p>
      <p>Âge : {profile.age}</p>
      <p>Genre : ?! ?! ?!</p>
      <p>Taille : {profile.height}</p>
      <p>Poids : {profile.weight}</p>
      <hr/>
      <p>Vos statistiques</p>
      <p>Depuis le 14 juin 2023 : {profile.createdAt}</p>
      <p>Temps total couru : {statistics.totalDuration}</p>
      <p>Calories brûlées : {statistics.totalCaloriesBurned}</p>
      <p>Distance totale parcourue : {statistics.totalDistance}</p>
      <p>Nombre de jours de repos : {statistics.restDays}</p>
      <p>Nombre de sessions : {statistics.totalSessions}</p>
    </div>
  );
}