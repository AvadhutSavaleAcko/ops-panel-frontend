import { styled } from '@acko-tech/building-blocks.ui.common';

export const TableContainer = styled.div`
  overflow: auto;
  height: calc(100% - 70px); 
  border-radius: 12px;
  background: white;
  -webkit-overflow-scrolling: touch;
  position: relative;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  
  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
`;



export const TableHeader = styled.thead`
  background: linear-gradient(90deg, #2c3e50, rgb(63, 93, 123));
  position: sticky; 
  top: 0; 
  z-index: 10
  th {
    padding: 16px 20px;
    text-align: left;
    color: white;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    max-width: 200px; 
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      padding: 12px 8px;
      font-size: 12px;
      max-width: 100px; 
    }
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: #f8fafc;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const TableRow = styled.tr`
  transition: all 0.2s ease;
  border-left: 3px solid transparent;

  &:hover {
    background: #f1f5f9;
    border-left: 3px solid #4f46e5;
    transform: translateX(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  @media (hover: none) {
    &:active {
      background: #f1f5f9;
      border-left: 3px solid #4f46e5;
    }
  }
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 13px;
    max-width: 100px;
  }
`;


export const ViewDetailsButton = styled.button`
  background:rgb(83, 99, 125);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background:rgb(136, 127, 236);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 11px;
  }

`;

export const ActionCell = styled(TableCell)`
  text-align: center;
  padding: 12px 16px;
  min-width: 100px;

  @media (max-width: 768px) {
    min-width: 80px;
  }
`;

export const ScrollIndicator = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: #64748b;
    font-size: 13px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    left: 0;
    right: 0;
    
    &::before {
      content: '←';
      margin-right: 8px;
      animation: pulse 2s infinite;
    }
    
    &::after {
      content: '→';
      margin-left: 8px;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 0.5; }
      50% { opacity: 1; }
      100% { opacity: 0.5; }
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  color: #64748b;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 24px 0;
  min-height: 200px;
  border: 2px dashed #e2e8f0;

  @media (max-width: 768px) {
    padding: 24px;
    font-size: 14px;
    min-height: 150px;
  }
`;

export const TableWrapper = styled.div<{ isExpanded: boolean }>`
  height: ${({ isExpanded }) => (isExpanded ? "200vh" : "calc(100vh - 280px)")};  // Reduced from -200px to -280px
  transition: height 0.3s ease;
  position: relative;
  padding: 0px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  z-index:0;
`;
export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: white;
  border-top: 1px solid #e2e8f0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 12px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PageButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ active }) => (active ? "#4338ca" : "#e2e8f0")};
  background: ${({ active }) => (active ? "#2c3e50" : "white")};
  color: ${({ active }) => (active ? "white" : "#1e293b")};
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ active }) => (active ? "#4338ca" : "#f8fafc")};
    border-color: #4338ca;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 13px;
  }
`;

export const RowsPerPageSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;

  select {
    padding: 6px 8px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    color: #1e293b;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #4338ca;
    }
  }
`;

export const ExpandButton = styled.button`
  padding: 8px 16px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #34495e;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;