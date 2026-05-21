import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

export interface UserInfo {
  name: string;
  authenticated: boolean;
  exp: number;
}

interface IAuthContext {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: UserInfo;
  login: () => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLoading: false,
  isAuthenticated: false,
  login: () => void 0,
  logout: () => void 0,
  refreshAuth: async () => void 0,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [user, setUser] = useState<UserInfo | undefined>(() => {
    const saved = localStorage.getItem("user");
    return saved ? (JSON.parse(saved) as UserInfo) : undefined;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const getUser = async () => {
    if (isLoading) return;

    const now = Date.now();

    if (user?.exp) {
      const expiresAt = user.exp * 1000;
      const fiveMinutes = 5 * 60 * 1000;

      if (now < expiresAt - fiveMinutes) {
        const lastCheck = localStorage.getItem("lastAuthCheck");
        const fifteenMinutes = 15 * 60 * 1000;
        if (
          lastCheck &&
          isAuthenticated &&
          now - parseInt(lastCheck) < fifteenMinutes
        ) {
          return;
        }
      }
    }

    setIsLoading(true);
    try {
      const userInfo = await axios
        .get<{ name: string; exp: string }>("/.auth/me")
        .then((r) => ({
          name: r.data.name,
          authenticated: true,
          exp: parseInt(r.data.exp),
        }))
        .catch((err: { response?: { status: number } }) => {
          if (err.response?.status === 401) {
            clearAuthState();
            return { name: "", authenticated: false, exp: 0 };
          }
          throw err;
        });

      const authenticated = userInfo.authenticated;
      setIsAuthenticated(authenticated);
      localStorage.setItem("isAuthenticated", String(authenticated));
      localStorage.setItem("lastAuthCheck", String(now));

      if (authenticated) {
        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
      } else {
        setUser(undefined);
        localStorage.removeItem("user");
      }
    } catch {
      clearAuthState();
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
    }
  };

  const clearAuthState = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("lastAuthCheck");
  };

  useEffect(() => {
    if (!hasInitialized) {
      void getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInitialized]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const interval = setInterval(() => {
      const now = Date.now();
      if (user.exp && now >= user.exp * 1000 - 5 * 60 * 1000) {
        void getUser();
      }
    }, 60_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const login = () => {
    window.location.href = "/.auth/login";
  };

  const logout = () => {
    clearAuthState();
    window.location.href = "/.auth/end-session";
  };

  const refreshAuth = () => {
    setHasInitialized(false);
    return getUser();
  };

  const contextValue = useMemo<IAuthContext>(
    () => ({ isAuthenticated, user, isLoading, login, logout, refreshAuth }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, user, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
