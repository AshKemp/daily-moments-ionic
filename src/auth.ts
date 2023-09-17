import React, { useContext } from "react";

export const AuthContext = React.createContext({ isLoggedIn: false });

export function useAuth() {
  return useContext(AuthContext);
}
