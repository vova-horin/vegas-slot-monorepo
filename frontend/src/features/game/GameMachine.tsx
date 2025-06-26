import React, { useState, useEffect } from "react";
import { useGame } from "../../contexts/GameContext";
import { RollSymbol } from "../../api/game";
import cherryImg from "../../assets/cherry.png";
import lemonImg from "../../assets/lemon.png";
import orangeImg from "../../assets/orange.png";
import watermelonImg from "../../assets/watermelon.png";
import noSlotImg from "../../assets/no-slot.png";

const symbolImages: Record<RollSymbol, string> = {
  [RollSymbol.CHERRY]: cherryImg,
  [RollSymbol.LEMON]: lemonImg,
  [RollSymbol.ORANGE]: orangeImg,
  [RollSymbol.WATERMELON]: watermelonImg,
};

export const GameMachine: React.FC = () => {
  const { roll, isRolling, sessionBalance, rollHistory } = useGame();
  const [revealedSymbols, setRevealedSymbols] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isRolling && !isSpinning) {
      setIsSpinning(true);
      setRevealedSymbols([false, false, false]);
    }
  }, [isRolling, isSpinning]);

  useEffect(() => {
    if (isSpinning && rollHistory.length > 0 && !isRolling) {
      setTimeout(() => {
        setRevealedSymbols((prev) => [true, prev[1], prev[2]]);
      }, 1000);

      setTimeout(() => {
        setRevealedSymbols((prev) => [prev[0], true, prev[2]]);
      }, 2000);

      setTimeout(() => {
        setRevealedSymbols((prev) => [prev[0], prev[1], true]);
      }, 3000);

      setTimeout(() => {
        setIsSpinning(false);
      }, 3500);
    }
  }, [isSpinning, rollHistory, isRolling]);

  const handleRoll = async () => {
    try {
      await roll();
    } catch (error) {
      console.error("Failed to roll:", error);
    }
  };

  const renderSymbol = (symbol: RollSymbol) => (
    <img
      src={symbolImages[symbol]}
      alt={symbol.toLowerCase()}
      className="w-12 h-12 object-contain"
    />
  );

  const renderSpinningSymbol = (index: number) => (
    <div className="animate-pulse" key={index}>
      <img
        src={noSlotImg}
        alt="rolling"
        className="w-12 h-12 object-contain opacity-50"
      />
    </div>
  );

  const renderSlotDisplay = () => {
    if (isRolling || isSpinning) {
      return (
        <div className="flex justify-center space-x-4">
          {[0, 1, 2].map((index) => {
            if (
              isSpinning &&
              rollHistory.length > 0 &&
              revealedSymbols[index]
            ) {
              return (
                <div key={index} className="animate-spin-once">
                  {renderSymbol(rollHistory[0].symbols[index])}
                </div>
              );
            } else {
              return (
                <div key={index} className="animate-spin">
                  {renderSpinningSymbol(index)}
                </div>
              );
            }
          })}
        </div>
      );
    } else if (rollHistory.length > 0) {
      return (
        <div className="flex justify-center space-x-4">
          {rollHistory[0].symbols.map((symbol, index) => (
            <div key={index}>{renderSymbol(symbol)}</div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex justify-center space-x-4">
          <img
            src={noSlotImg}
            alt="empty"
            className="w-12 h-12 object-contain opacity-30"
          />
          <img
            src={noSlotImg}
            alt="empty"
            className="w-12 h-12 object-contain opacity-30"
          />
          <img
            src={noSlotImg}
            alt="empty"
            className="w-12 h-12 object-contain opacity-30"
          />
        </div>
      );
    }
  };

  const renderResultMessage = () => {
    if (rollHistory.length > 0 && !isRolling && !isSpinning) {
      return (
        <div className="mt-4">
          {rollHistory[0].isWin ? (
            <p className="text-green-600 font-bold text-lg animate-pulse">
              🎉 WIN! +{rollHistory[0].reward} credits
            </p>
          ) : (
            <p className="text-gray-600">No win this time</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Slot Machine</h2>

        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          {renderSlotDisplay()}
          {renderResultMessage()}
        </div>

        <button
          onClick={handleRoll}
          disabled={isRolling || isSpinning || sessionBalance < 1}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold text-lg"
        >
          {isRolling || isSpinning ? "Rolling..." : "Roll (1 credit)"}
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Roll History</h3>
        {rollHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <img
              src={noSlotImg}
              alt="no rolls"
              className="w-16 h-16 mx-auto mb-4 opacity-30"
            />
            <p>No rolls yet. Click the Roll button to start playing!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Roll #
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    Symbols
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    Result
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    Reward
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {rollHistory.map((rollResult, index) => (
                  <tr key={rollResult.rollId} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {rollHistory.length - index}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <div className="flex justify-center space-x-2">
                        {rollResult.symbols.map((symbol, symbolIndex) => (
                          <div key={symbolIndex}>{renderSymbol(symbol)}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {rollResult.isWin ? (
                        <span className="text-green-600 font-bold">WIN</span>
                      ) : (
                        <span className="text-gray-500">LOSS</span>
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {rollResult.reward > 0 ? (
                        <span className="text-green-600 font-bold">
                          +{rollResult.reward}
                        </span>
                      ) : (
                        <span className="text-gray-500">0</span>
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {rollResult.creditsAfter.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
