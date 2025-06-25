import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`border-2 border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = "",
}) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex-1 border-r border-gray-300 last:border-r-0 p-4 text-center font-bold text-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Table;
