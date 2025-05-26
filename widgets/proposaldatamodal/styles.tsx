import { styled } from "@acko-tech/building-blocks.ui.common";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90vw;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 8px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 900px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
//   box-sizing: border-box;

  &::placeholder {
    color: #94a3b8;
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 1024px) {
    padding: 8px 10px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 7px 10px;
    width:150px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 8px;
  }

  @media (max-width: 360px) {
    font-size: 11.5px;
    padding: 6px;
  }
`;

export const JsonViewer = styled.pre`
  margin: 0;
  padding: 24px;
  overflow: auto;
  font-family: "Fira Code", monospace;
  font-size: 14px;
  line-height: 1.5;
  background: #f8fafc;
  flex: 1;

  mark {
    background: #fef3c7;
    padding: 2px 0;
    border-radius: 2px;

    &.current {
      background:rgb(119, 159, 245);
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
    font-size: 13px;
  }
`;

export const SearchStats = styled.div`
  font-size: 14px;
  color: #64748b;
  padding: 4px 8px;
  background: #f1f5f9;
  border-radius: 4px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 3px 6px;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  &:active {
    background: #f1f5f9;
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #f1f5f9;
  }

  &:active {
    background: #e2e8f0;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 10px;
  background: #1e293b;
  color: white;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;

  ${IconButton}:hover & {
    opacity: 1;
    visibility: visible;
    top: -35px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CloseIcon = styled.svg.attrs({
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
})`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;

  &:after {
    content: "×";
  }

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

export const CopyIcon = styled.svg.attrs({
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
})`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;

  path {
    d: path(
      "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2M8 4v12a2 2 0 002 2h8a2 2 0 002-2V8l-4-4H8z"
    );
  }

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

export const ArrowUpIcon = styled.svg.attrs({
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
})`
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;

  path {
    d: path("M12 19V5M5 12l7-7 7 7");
  }

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const ArrowDownIcon = styled.svg.attrs({
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
})`
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;

  path {
    d: path("M12 5v14M5 12l7 7 7-7");
  }

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const SearchIcon = styled.span`
  font-size: 16px;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const StyledCloseIcon = styled(CloseIcon)`
  width: 20px;
  height: 20px;
  color: #64748b;
  transition: color 0.2s ease;

  &:hover {
    color: #475569;
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

export const CloseIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    color: #64748b;
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: #475569;
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;
