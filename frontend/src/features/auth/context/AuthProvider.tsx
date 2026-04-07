import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/auth";
import { authService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.code === 1000 && res.result) {
            setUser(res.result);
          } else {
            console.warn("Failed to fetch user context", res);
          }
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
