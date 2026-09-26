import { useContext } from "react";
import { UserInfoContext } from "../context/UserInfoContext";

export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo doit être utilisé à l'intérieur d'un UserInfoProvider");
  }
  return context;
}
