import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { authApi, SignUpResponse } from "../api/auth";
import { userApi, UserProfile } from "../api/user";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  signUp: () => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  const refreshUser = async (): Promise<void> => {
    try {
      const userData = await userApi.getMe();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      // If user data fetch fails, user might not be authenticated
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("authToken");
    }
  };

  const signUp = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response: SignUpResponse = await authApi.signUp();

      localStorage.setItem("authToken", response.accessToken);

      setIsAuthenticated(true);
      await refreshUser();
      setIsLoading(false);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
        await refreshUser();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    signUp,
    logout,
    refreshUser,
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
