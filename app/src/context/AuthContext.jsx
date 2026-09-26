import { createContext, useState } from "react";
import { setToken, getToken, removeToken } from "../utils/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken() || null);

  const login = (newToken) => {
    setToken(newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
  };

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
