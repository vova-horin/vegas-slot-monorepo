import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  gameApi,
  SessionResponse,
  RollResponse,
  CashoutResponse,
} from "../api/game";
import { useAuth } from "./AuthContext";

interface GameContextType {
  currentSession: SessionResponse | null;
  sessionBalance: number;
  isSessionActive: boolean;
  rollHistory: RollResponse[];

  isRolling: boolean;
  isStartingSession: boolean;
  isCashingOut: boolean;

  startNewSession: () => Promise<void>;
  roll: () => Promise<RollResponse | null>;
  cashout: () => Promise<CashoutResponse | null>;
  clearSession: () => void;
  clearRollHistory: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { refreshUser } = useAuth();
  const [currentSession, setCurrentSession] = useState<SessionResponse | null>(
    null
  );
  const [rollHistory, setRollHistory] = useState<RollResponse[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [isStartingSession, setIsStartingSession] = useState(false);
  const [isCashingOut, setIsCashingOut] = useState(false);

  const sessionBalance = currentSession?.credits || 0;
  const isSessionActive = currentSession?.isActive || false;

  const startNewSession = useCallback(async (): Promise<void> => {
    try {
      setIsStartingSession(true);
      const session = await gameApi.startSession();
      setCurrentSession(session);
      setRollHistory([]);
      await refreshUser();
    } catch (error) {
      console.error("Failed to start new session:", error);
      throw error;
    } finally {
      setIsStartingSession(false);
    }
  }, []);

  const roll = useCallback(async (): Promise<RollResponse | null> => {
    if (!currentSession?.sessionId) {
      console.error("No active session to roll in");
      return null;
    }

    try {
      setIsRolling(true);
      const rollResult = await gameApi.roll(currentSession.sessionId);

      setCurrentSession((prev) =>
        prev
          ? {
              ...prev,
              credits: rollResult.creditsAfter,
            }
          : null
      );

      setRollHistory((prev) => [rollResult, ...prev]);

      return rollResult;
    } catch (error) {
      console.error("Failed to roll:", error);
      throw error;
    } finally {
      setIsRolling(false);
    }
  }, [currentSession?.sessionId]);

  const cashout = useCallback(async (): Promise<CashoutResponse | null> => {
    if (!currentSession?.sessionId) {
      console.error("No active session to cash out");
      return null;
    }

    try {
      setIsCashingOut(true);
      const cashoutResult = await gameApi.cashout(currentSession.sessionId);

      setCurrentSession(null);
      setRollHistory([]);
      await refreshUser();

      return cashoutResult;
    } catch (error) {
      console.error("Failed to cash out:", error);
      throw error;
    } finally {
      setIsCashingOut(false);
    }
  }, [currentSession?.sessionId]);

  const clearSession = useCallback((): void => {
    setCurrentSession(null);
    setRollHistory([]);
  }, []);

  const clearRollHistory = useCallback((): void => {
    setRollHistory([]);
  }, []);

  const value: GameContextType = {
    currentSession,
    sessionBalance,
    isSessionActive,
    rollHistory,
    isRolling,
    isStartingSession,
    isCashingOut,
    startNewSession,
    roll,
    cashout,
    clearSession,
    clearRollHistory,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
