import { useState } from "react";
import { getUserActivity } from "../services/api";

export function useFetchUserActivity(token) {
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cacheToken, setCacheToken] = useState(token);

  // Vide le cache quand le token change (déconnexion / changement d'utilisateur)
  if (token !== cacheToken) {
    setCacheToken(token);
    setCache({});
    setError(null);
  }

  async function fetchActivity(startDate, endDate) {
    const cacheKey = `${startDate}_${endDate}`;

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    setLoading(true);
    setError(null);
    try {
      const sessions = await getUserActivity(startDate, endDate, token);
      setCache(prev => ({ ...prev, [cacheKey]: sessions }));
      return sessions;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }

  return { fetchActivity, loading, error };
}
