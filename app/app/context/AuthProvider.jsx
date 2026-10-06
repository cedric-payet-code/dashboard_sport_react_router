import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { setToken, getToken, removeToken } from "../utils/auth";

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken() || null);

  // useCallback / useMemo : les consommateurs ne se re-rendent que si le token change
  const login = useCallback((newToken) => {
    setToken(newToken);
    setTokenState(newToken);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
  }, []);

  const value = useMemo(() => ({
    token,
    isAuthenticated: !!token,
    login,
    logout
  }), [token, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
