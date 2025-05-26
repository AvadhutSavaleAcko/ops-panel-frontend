import { styled } from "@acko-tech/building-blocks.ui.common";

export const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.nav`
  width: 250px;
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 50px 0 0 0;
`;

export const NavButton = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 25px;
  color: white;

  &:hover {
    background: #34495e;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export const Title = styled.h1`
  margin: 0 0 20px 0;
  color: #2c3e50;
`;

export const SearchBar = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SearchButton = styled.button`
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #2980b9;
  }
`;

export const PanelContainer = styled.div`
  display: flex;
  height: 100vh;
`;
