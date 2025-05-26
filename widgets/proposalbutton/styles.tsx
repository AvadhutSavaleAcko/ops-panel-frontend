import { styled } from '@acko-tech/building-blocks.ui.common';


export const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center; // Added for better alignment
  gap: 8px;
  padding: 12px 20px;
  background: rgb(75, 100, 211);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 24px;
  width: 15%;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    opacity: 0.95;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 140px; // Fixed width for mobile
    padding: 10px 16px;
    margin-top: 16px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    width: 120px;
    padding: 8px 12px;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 18px;
  display: flex; // Added for better emoji alignment
  align-items: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: rgb(252, 254, 254);
  white-space: nowrap; // Prevents text wrapping
  text-overflow: ellipsis; // Shows ... if text overflows
  overflow: hidden; // Hides overflow text

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;