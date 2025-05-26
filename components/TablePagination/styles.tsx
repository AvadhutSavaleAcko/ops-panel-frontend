import { styled } from "@acko-tech/building-blocks.ui.common";

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
`;

export const RowsPerPageSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    color: #64748b;
    font-size: 14px;
  }
  
  select {
    padding: 4px 8px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    
    &:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${props => props.active ? '#4f46e5' : '#e2e8f0'};
  border-radius: 4px;
  background-color: ${props => props.active ? '#4f46e5' : 'white'};
  color: ${props => props.active ? 'white' : '#1e293b'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#4338ca' : '#f1f5f9'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ExpandButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
  color: #1e293b;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;