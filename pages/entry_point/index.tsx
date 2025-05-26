import React from "react";
import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";
import styled from "styled-components";
import AckoLogo from "@public/images/acko_new_logo.svg";

const EntryPoint = () => {
  const handleEnter = async () => {
    const payload = {
      requestBody: {
        current_node: "entry_node",
        expected_node: "common_dashboard",
        journey: "ops_panel"
      },
      data: {}
    };

    await fetchConfigAndRedirect({
      ...payload,
      shouldRedirect: true,
      showBasicLoader: true,
      shouldClearStore: true,
      showCustomBasicLoader: true
    });
  };

  return (
    <Container>
      <LogoContainer>
        <AckoLogo />
      </LogoContainer>
      <EnterButton onClick={handleEnter}>Enter Dashboard</EnterButton>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(10, 10, 10);
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
`;

const EnterButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #2980b9;
  }
`;

export default EntryPoint;
