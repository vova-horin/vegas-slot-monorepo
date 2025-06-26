import React, { memo, useEffect } from "react";
import { useGame } from "../../contexts/GameContext";
import { SessionBalance } from "./SessionBalance";
import { GameMachine } from "./GameMachine";

export const Game: React.FC = memo(() => {
  const { isSessionActive, startNewSession, isStartingSession } = useGame();

  useEffect(() => {
    startNewSession().catch(console.error);
  }, []);

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
          <button
            onClick={() => startNewSession()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start New Game Session
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
