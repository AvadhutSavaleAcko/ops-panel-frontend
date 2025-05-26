import { styled } from "@acko-tech/building-blocks.ui.common";

export const DashboardContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  position: relative;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.nav`
  width: 250px;
  // background: #2c3e50;
  padding: 20px;
  height: 100vh;
  position: sticky;
  top: 0;
  flex-shrink: 0;
  align-self: flex-start;
  transition: all 0.3s ease;
  z-index: 100;

  @media (max-width: 1024px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    padding: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;
export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 40px;
  background: #fff;
  min-height: 100vh;
  width: calc(100% - 290px);
  overflow-x: auto;

  @media (max-width: 1024px) {
    width: calc(100% - 240px);
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;
export const TabTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  text-transform: capitalize;
`;
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
