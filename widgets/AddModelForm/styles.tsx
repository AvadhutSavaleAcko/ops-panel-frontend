// ... existing styles ...

import { styled } from "@acko-tech/building-blocks.ui.common";

export const AddModelButton = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export const FormContainer = styled.form`
  max-width: 800px;
  margin: 0 auto;
//   padding: 32px;
  padding-top:10px;
  padding-bottom:32px;
  padding-left: 32px;
  padding-right: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
//   margin-bottom: 24px;
  color: #1e293b;
  font-size: 28px;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 770px;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    &::placeholder {
      color: transparent; 
    }
  }

  &:not(:placeholder-shown) {
    &::placeholder {
      color: transparent; 
    }
  }
`;


export const InputSmall = styled.input`
  width: 90%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    &::placeholder {
      color: transparent; 
    }
  }

  &:not(:placeholder-shown) {
    &::placeholder {
      color: transparent; 
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const SaveButton = styled.button`
  padding: 10px 24px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4338ca;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 24px;
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const PathVariableContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  align-items: center;
`;

export const AddPathVariableButton = styled.button`
  padding: 10px 16px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #34495e;
  }
`;

export const PathVariableList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PathVariableItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 14px;
  color: #334155;
  border: 1px solid #e2e8f0;
`;

export const RemovePathVariableButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
  }
`;

export const Formheader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;