import Button from "@acko-tech/building-blocks.ui.button-old";
import { Box } from "@acko-tech/building-blocks.ui.common";
import styled from "styled-components";

export const StyledInput = styled.input`
  color: #0b3874;
  width: calc(100% - 22px);
  border-radius: 10px;
  background: #ffffff;
  padding: 12px 12px;
  font-size: 1rem;
  line-height: 24px;
  outline: none;
  border: none;
  @media (max-width: 786px) {
    // padding: 4px;
  }
  ::placeholder {
    color: #A7B8CD;
    font: arial;
  }
`;

export const FieldButton = styled(Button)`
  height: 40px;
  background: none;
  color: #040222;
  text-align: center;
  font-family: "Euclid Circular B";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px !important;
  letter-spacing: 0.1px;
  padding: 4px 16px;
  max-height: 40px !important;
  border-radius: 8px;
  border: 1px solid #040222;
  cursor: pointer;
  min-width: 88px;
  width: 100%;
  @media (max-width: 786px) {
    height: 40px;
    padding: 6px 16px;
  }
  :hover {
    background-color: #ffffff;
    color: #040222;
    border: 1px solid #040222;
    cursor: pointer;
  }
`;

export const FieldButtonWrapper = styled(Box)`
  position: absolute;
  right: 4px;
  top: 4px;
  width: auto;
  height: 40px;
  max-height: 40px;
  @media (max-width: 786px) {
    width: 88px;
    right: 4px;
  }
`;
