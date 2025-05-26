import { styled } from "@acko-tech/building-blocks.ui.common";

export const SearchBar = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 50px;
  padding: 0 20px;

  @media (max-width: 1024px) {
    max-width: 600px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 15px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border-radius: 8px;
  padding: 12px;

  @media (max-width: 1024px) {
    gap: 8px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;
export const DropdownContainer = styled.div`
  position: relative;
  width: 220px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 180px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  font-size: 14px;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3498db;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    max-height: 60vh;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ isSelected }) => (isSelected ? "#f0f7ff" : "white")};
  color: ${({ isSelected }) => (isSelected ? "#3498db" : "#2c3e50")};

  &:hover {
    background: #f8f9fa;
  }

  @media (max-width: 768px) {
    padding: 16px;
    font-size: 14px;
    border-bottom: 1px solid #f1f1f1;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  width: 400px;
  padding: 12px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  font-size: 14px;
  color: #2c3e50;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  width: 120px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    padding: 12px 16px;
    width: 100px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchIcon = styled.span`
  font-size: 16px;
`;
export const ArrowIcon = styled.span<{ isOpen: boolean }>`
  font-size: 12px;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;