import React, { memo, useEffect, useState } from "react";
import { useGame } from "../../contexts/GameContext";
import { SessionBalance } from "./SessionBalance";
import { GameMachine } from "./GameMachine";

export const Game: React.FC = memo(() => {
  const {
    isSessionActive,
    startNewSession,
    isStartingSession,
    extractErrorMessage,
  } = useGame();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startNewSession().catch((err) => {
      console.error("Failed to start initial session:", err);
      setError(extractErrorMessage(err));
    });
  }, []);

  const handleStartSession = async () => {
    try {
      setError(null);
      await startNewSession();
    } catch (err: any) {
      console.error("Failed to start session:", err.message);
      setError(extractErrorMessage(err));
    }
  };

  if (isStartingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Starting game session...</p>
        </div>
      </div>
    );
  }

  if (!isSessionActive) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <button
            onClick={handleStartSession}
            disabled={isStartingSession}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isStartingSession ? "Starting..." : "Start New Game Session"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <SessionBalance />
        <GameMachine />
      </div>
    </div>
  );
});
