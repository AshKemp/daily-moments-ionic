import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase";

interface Auth {
  isLoggedIn: boolean;
  userId?: string;
}

interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({ isLoggedIn: false });

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({
    loading: true,
  });
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const auth = firebaseUser
        ? { isLoggedIn: true, userId: firebaseUser.uid }
        : { isLoggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);
  return authInit;
}
