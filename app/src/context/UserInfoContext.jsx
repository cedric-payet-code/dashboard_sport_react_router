import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";

export const UserInfoContext = createContext(null);

export function UserInfoProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const value = useFetchUserInfo(token, isAuthenticated);

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}
