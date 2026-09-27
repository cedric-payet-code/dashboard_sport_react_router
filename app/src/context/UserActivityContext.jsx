import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFetchUserActivity } from "../hooks/useFetchUserActivity";

export const UserActivityContext = createContext(null);

export function UserActivityProvider({ children }) {
  const { token } = useAuth();
  const value = useFetchUserActivity(token);

  return <UserActivityContext.Provider value={value}>{children}</UserActivityContext.Provider>;
}
