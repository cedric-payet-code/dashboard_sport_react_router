import { useContext } from "react";
import { UserActivityContext } from "../context/UserActivityContext";

export function useUserActivity() {
  const context = useContext(UserActivityContext);
  if (!context) {
    throw new Error("useUserActivity doit être utilisé à l'intérieur d'un UserActivityProvider");
  }
  return context;
}
