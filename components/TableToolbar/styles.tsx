import { styled } from "@acko-tech/building-blocks.ui.common";

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

export const SearchContainer = styled.div`
  flex: 1;
  margin-right: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ExportButton = styled.button`
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;