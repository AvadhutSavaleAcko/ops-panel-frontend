import { styled } from "@acko-tech/building-blocks.ui.common";

export const InfoCardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 8px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color:rgb(93, 73, 183);
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 12px;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: #3498db;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
  overflow: hidden;
  min-width: 0;

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const Label = styled.span`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Value = styled.span`
  font-size: 16px;
  color: #1e293b;
  font-weight: 600;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;

  &:empty:before {
    content: "—";
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const Container = styled.div`
  display: grid;
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px;
  background: #f8fafc;
  border-radius: 16px;

  @media (max-width: 1024px) {
    padding: 24px;
    gap: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 20px;
    border-radius: 12px;
  }
`;

export const ChildrenContainer = styled.div`
  margin-top: 24px;
  padding-top: 20px;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding-top: 16px;
  }
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  margin-top: 16px;
  background: #f1f5f9;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
  }
`;

export const ButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

export const ArrowIcon = styled.span<{ isOpen: boolean }>`
  color: #64748b;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
`;

export const CollapsibleContent = styled.div<{ isOpen: boolean }>`
  margin-top: ${({ isOpen }) => (isOpen ? "16px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  max-height: ${({ isOpen }) => (isOpen ? "2000px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;
