import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import BalanceLabel from "../../components/BalanceLabel";

export const UserBalance: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        Not authenticated
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
      <BalanceLabel balance={user.gameCredits} label="User Credits" />
    </div>
  );
};
