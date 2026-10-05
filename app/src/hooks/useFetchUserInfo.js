import { useState, useEffect } from "react";
import { getUserActivity, getUserInfo } from "../services/api";
import { calculateRestDays, calculateTotalCaloriesBurned } from "../utils/statsCalculator";

export function useFetchUserInfo(token, isAuthenticated) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setUserInfo(null);
      setError(null);
      return;
    }

    async function fetchUserInfo() {
      setLoading(true);
      setError(null);
      try {
        const userInfoData = await getUserInfo(token);
        const userActivityData = await getUserActivity(userInfoData.profile.createdAt, new Date(), token); //faire les deux requêtes en même temps

        // const [userInfoData, userActivityData] = await Promise.all([getUserInfo(token),  getUserActivity(userInfoData.profile.createdAt, new Date(), token)])

        const totalCaloriesBurned = calculateTotalCaloriesBurned(userActivityData);
        const restDays = calculateRestDays(userInfoData.profile.createdAt, userActivityData);

        setUserInfo({
          ...userInfoData,
          statistics: {
            ...userInfoData.statistics,
            totalCaloriesBurned,
            restDays
          }
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserInfo();
  }, [isAuthenticated, token]);

  return { userInfo, loading, error };
}
