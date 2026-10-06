import { useCallback, useMemo, useRef } from "react";
import { getUserActivity, UnauthorizedError } from "../services/api";

export function useFetchUserActivity(token, onUnauthorized) {
  // Cache des requêtes par période, propre à un token (vidé à la déconnexion / changement d'utilisateur).
  // On garde la promesse et non le résultat : deux composants qui demandent la même période
  // en même temps partagent la même requête.
  const cacheRef = useRef({ token, requests: {} });

  const fetchActivity = useCallback((startDate, endDate) => {
    if (cacheRef.current.token !== token) {
      cacheRef.current = { token, requests: {} };
    }
    const { requests } = cacheRef.current;
    const cacheKey = `${startDate}_${endDate}`;

    if (!requests[cacheKey]) {
      requests[cacheKey] = getUserActivity(startDate, endDate, token).catch((err) => {
        // Une requête en échec n'est pas gardée en cache, pour pouvoir être relancée
        delete requests[cacheKey];
        if (err instanceof UnauthorizedError) onUnauthorized();
        throw err;
      });
    }

    return requests[cacheKey];
  }, [token, onUnauthorized]);

  return useMemo(() => ({ fetchActivity }), [fetchActivity]);
}
