import React from "react";
import { useGame } from "../../contexts/GameContext";
import BalanceLabel from "../../components/BalanceLabel";

export const SessionBalance: React.FC = () => {
  const { sessionBalance, cashout, isCashingOut, isSpinning } = useGame();

  const handleCashout = async () => {
    try {
      await cashout();
    } catch (error) {
      console.error("Failed to cash out:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <BalanceLabel balance={sessionBalance} label="Session Credits" />
        </div>
        <button
          onClick={handleCashout}
          disabled={isCashingOut || isSpinning || sessionBalance <= 0}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          {isCashingOut ? "Cashing Out..." : "Cash Out"}
        </button>
      </div>
    </div>
  );
};
