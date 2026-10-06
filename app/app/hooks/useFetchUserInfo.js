import { useState, useEffect } from "react";
import { getUserActivity, getUserInfo, UnauthorizedError } from "../services/api";
import { calculateRestDays, calculateTotalCaloriesBurned } from "../utils/statsCalculator";

export function useFetchUserInfo(token, onUnauthorized) {
  // Le résultat est associé au token qui l'a produit : tant qu'il ne correspond pas
  // au token courant, la requête est en cours (ou l'utilisateur est déconnecté)
  const [result, setResult] = useState({ token: null, userInfo: null, error: null });

  useEffect(() => {
    if (!token) return;
    let ignore = false;

    async function fetchUserInfo() {
      try {
        // Les deux requêtes ne peuvent pas être parallèles :
        // la période d'activité commence à la date d'inscription renvoyée par la première
        const userInfoData = await getUserInfo(token);
        const userActivityData = await getUserActivity(userInfoData.profile.createdAt, new Date(), token);

        if (ignore) return;
        setResult({
          token,
          error: null,
          userInfo: {
            ...userInfoData,
            statistics: {
              ...userInfoData.statistics,
              totalCaloriesBurned: calculateTotalCaloriesBurned(userActivityData),
              restDays: calculateRestDays(userInfoData.profile.createdAt, userActivityData)
            }
          }
        });
      } catch (err) {
        if (ignore) return;
        if (err instanceof UnauthorizedError) onUnauthorized();
        setResult({ token, userInfo: null, error: err.message });
      }
    }

    fetchUserInfo();
    return () => {
      ignore = true;
    };
  }, [token, onUnauthorized]);

  const isCurrent = !!token && result.token === token;

  return {
    userInfo: isCurrent ? result.userInfo : null,
    loading: !!token && !isCurrent,
    error: isCurrent ? result.error : null
  };
}
