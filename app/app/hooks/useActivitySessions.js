import { useEffect, useState } from "react";
import { useUserActivity } from "./useUserActivity";

// Séances d'une période, avec leur état de chargement et d'erreur propres au composant appelant
export function useActivitySessions(startDate, endDate) {
  const { fetchActivity } = useUserActivity();
  const [result, setResult] = useState({ key: null, sessions: [], error: null });
  const key = `${startDate}_${endDate}`;

  useEffect(() => {
    let ignore = false;

    fetchActivity(startDate, endDate)
      .then((sessions) => {
        if (!ignore) setResult({ key, sessions, error: null });
      })
      .catch((err) => {
        if (!ignore) setResult({ key, sessions: [], error: err.message });
      });

    return () => {
      ignore = true;
    };
  }, [fetchActivity, startDate, endDate, key]);

  // Tant que le résultat ne correspond pas à la période demandée, la requête est en cours
  const loading = result.key !== key;

  return {
    sessions: loading ? [] : result.sessions,
    loading,
    error: loading ? null : result.error
  };
}
