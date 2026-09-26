import { createContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserActivity } from "../services/api";

export const UserActivityContext = createContext(null);

export function UserActivityProvider({ children }) {
  const { token } = useAuth();
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUserActivity(startDate, endDate) {
    const cacheKey = `${startDate}_${endDate}`;

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    setLoading(true);
    setError(null);
    try {
      const sessions = await getUserActivity(token, startDate, endDate);
      setCache(prev => ({ ...prev, [cacheKey]: sessions }));
      return sessions;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }

  const value = { fetchActivity: fetchUserActivity, loading, error };

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
}
