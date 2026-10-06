import { UserActivityContext } from "./UserActivityContext";
import { useAuth } from "../hooks/useAuth";
import { useFetchUserActivity } from "../hooks/useFetchUserActivity";

export function UserActivityProvider({ children }) {
  const { token, logout } = useAuth();
  const value = useFetchUserActivity(token, logout);

  return <UserActivityContext.Provider value={value}>{children}</UserActivityContext.Provider>;
}
