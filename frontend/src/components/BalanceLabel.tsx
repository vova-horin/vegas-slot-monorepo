import React from "react";

interface BalanceLabelProps {
  balance: number;
  label?: string;
  className?: string;
}

const BalanceLabel: React.FC<BalanceLabelProps> = ({
  balance,
  label = "Balance",
  className = "",
}) => {
  return (
    <div
      className={`bg-green-100 border border-green-300 rounded-lg px-4 py-2 ${className}`}
    >
      <span className="text-green-800 font-semibold">{label}: </span>
      <span className="text-green-900 font-bold">{balance} credits</span>
    </div>
  );
};

export default BalanceLabel;
