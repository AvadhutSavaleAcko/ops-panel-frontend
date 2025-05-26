import { styled } from "@acko-tech/building-blocks.ui.common";

export const AddModelButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #2c3e50;
  color: white;
  border: 2px dashed rgba(246, 247, 249, 0.3);
  
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(241, 230, 230, 0.2);
    border-color: rgba(39, 26, 26, 0.4);
  }
  margin-top: 10px;
  border-radius: 4px;
`;