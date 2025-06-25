import React, { createContext, useContext, useState, ReactNode } from "react";
import { authApi, SignUpResponse } from "../api/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response: SignUpResponse = await authApi.signUp();

      localStorage.setItem("authToken", response.accessToken);

      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
