import React from "react";
import {
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  ActionCell,
  ViewDetailsButton
} from "./styles";

interface TableContentProps {
  data: any[];
  currentPage: number;
  rowsPerPage: number;
  onViewDetails: (row: any) => void;
  config?: any;
}

export const TableContent: React.FC<TableContentProps> = ({
  data,
  currentPage,
  rowsPerPage,
  onViewDetails,
  config
}) => {
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const displayHeaders =
    config?.props?.columns?.order ||
    Object.keys(data[0]?.tableFieldsData || {});

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "-";

    if (typeof value === "number" && value.toString().length >= 10) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
        }
      } catch {
        return value.toString();
      }
    }

    if (typeof value === "object") {
      try {
        if (value instanceof Date) {
          return value.toLocaleString();
        }
        return JSON.stringify(value);
      } catch {
        return "-";
      }
    }

    return String(value);
  };

  return (
    <StyledTable>
      <TableHeader>
        <tr>
          {displayHeaders.map((header) => (
            <th key={header} title={header}>
              {header.replace(/_/g, " ").toUpperCase()}
            </th>
          ))}
          <th>ACTIONS</th>
        </tr>
      </TableHeader>
      <TableBody>
        {currentRows.map((item, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {displayHeaders.map((header) => (
              <TableCell
                key={`cell-${rowIndex}-${header}`}
                title={String(item.tableFieldsData[header])}
              >
                {formatValue(item.tableFieldsData[header])}
              </TableCell>
            ))}
            <ActionCell>
              <ViewDetailsButton onClick={() => onViewDetails(item)}>
                View Details
              </ViewDetailsButton>
            </ActionCell>
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};
