import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserBalance } from "../features/user";
import { Game } from "../features/game/Game";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <div className="max-w-[1200px] mx-auto p-[10px]">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vegas Slot Machine
          </h1>
        </div>
        {isAuthenticated && (
          <div className="flex items-center justify-center gap-4 flex-col">
            <UserBalance />
            <Game />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
