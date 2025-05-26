import { styled } from "@acko-tech/building-blocks.ui.common";

export const ConfigureContainer = styled.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
`;

export const FieldsContainer = styled.div`
  overflow-y: auto;
  max-height: calc(90vh - 300px);
  padding-right: 16px;
  margin-bottom: 15px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 4px;
  }
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr auto;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
`;

export const FieldName = styled.div`
  font-size: 14px;
  color: #475569;
  font-family: monospace;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  max-width: 300px;
  cursor: pointer;
`;

export const FieldInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  max-width: 400px; 
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
  cursor: pointer; /* Indicate interactivity for tooltip */
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const DeleteButton = styled.button`
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

export const AddToTableButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  background: ${({ disabled }) => disabled ? '#94a3b8' : '#2563eb'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ disabled }) => disabled ? '#94a3b8' : '#1d4ed8'};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
  padding-top: 16px;
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4338ca;
  }
`;

export const TableFieldsSection = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  
  h3 {
    color: #1e293b;
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const TableFieldsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TableField = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  
  span {
    font-size: 14px;
    color: #475569;
  }
`;

export const HighlightedText = styled.span`
  color: rgb(0, 0, 0); 
  font-weight: 700; 
  text-transform: capitalize;
  font-size: 28px; 
  letter-spacing: 0.5px; 
  text-decoration: underline; 
  text-decoration-color: rgb(74, 66, 224); 
  text-decoration-thickness: 2px; 
  text-underline-offset: 4px; 
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)); 
  padding: 2px 4px;
  border-radius: 4px; 
`;