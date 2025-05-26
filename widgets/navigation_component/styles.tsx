import { styled } from "@acko-tech/building-blocks.ui.common";

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

export const NavWrapper = styled.div`
  width: 250px;
  min-height: 100vh;
  background: #2c3e50;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
`;

export const DashboardContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 100px);
  background: #f8fafc;
`;
export const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 24px;
  min-height: 100vh;
  background: #f8fafc;
`;

export const Sidebar = styled.nav`
  width: 280px;
  background: #2c3e50;
  padding: 24px;
  height: 100px;
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(44, 62, 80, 0.7);
  border-radius: 8px;
  z-index: 2;
`;

export const NavButton = styled.button<{ isActive?: boolean; disabled?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: ${({ isActive }) => (isActive ? 'rgb(52, 93, 134)' : 'transparent')};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background: ${({ isActive }) => (isActive ? '#3498db' : '#34495e')};
  }

  &:disabled {
    pointer-events: none;
  }
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: 24px;
  margin-left: 280px; // Same as Sidebar width
  width: calc(100% - 280px);
`;

export const TabTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 24px;
  text-transform: capitalize;
`;
