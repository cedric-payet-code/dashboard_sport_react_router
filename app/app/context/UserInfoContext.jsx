import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";

export const UserInfoContext = createContext(null);

export function UserInfoProvider({ children }) {
  const { token, logout } = useAuth();
  const value = useFetchUserInfo(token, logout);

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}
