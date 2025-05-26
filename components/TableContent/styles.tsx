import { styled } from "@acko-tech/building-blocks.ui.common";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f8fafc;
  border-bottom: 2px solid #e2e8f0;

  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    color: #475569;
    white-space: nowrap;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f8fafc;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #1e293b;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ActionCell = styled.td`
  padding: 12px 16px;
  text-align: right;
  white-space: nowrap;
`;

export const ViewDetailsButton = styled.button`
  padding: 6px 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;

export const ScrollIndicator = styled.div`
  padding: 8px;
  text-align: center;
  background-color: #f8fafc;
  color: #64748b;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;