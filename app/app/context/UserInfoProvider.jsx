import { UserInfoContext } from "./UserInfoContext";
import { useAuth } from "../hooks/useAuth";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";

export function UserInfoProvider({ children }) {
  const { token, logout } = useAuth();
  const value = useFetchUserInfo(token, logout);

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}
