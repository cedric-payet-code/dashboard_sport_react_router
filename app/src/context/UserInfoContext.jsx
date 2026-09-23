import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUserActivity, getUserInfo } from "../services/api";
import { calculateRestDays, calculateTotalCaloriesBurned } from "../utils/statsCalculator";

const UserInfoContext = createContext(null);

export function UserInfoProvider({ children }) {
  const { token, isAuthenticated } = useAuth();

  const [userInfo, setUserInfoState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setUserInfo = (newUserInfo) => {
    setUserInfoState(newUserInfo);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setUserInfoState(null);
      return;
    }

    async function fetchUserInfo() {
      setLoading(true);
      setError(null);
      try {
        const userInfoData = await getUserInfo(token);
        const userActivityData = await getUserActivity(token, userInfoData.profile.createdAt, new Date());

        const totalCaloriesBurned = calculateTotalCaloriesBurned(userActivityData);
        const restDays = calculateRestDays(userInfoData.profile.createdAt, userActivityData)

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

  const value = {
    userInfo,
    setUserInfo,
    loading,
    error
  };

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo doit être utilisé à l'intérieur d'un UserInfoProvider");
  }
  return context;
}