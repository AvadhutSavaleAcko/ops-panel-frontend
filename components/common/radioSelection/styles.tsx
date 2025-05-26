import { styled } from "@acko-tech/building-blocks.ui.common";

export const Label = styled.label`
  display: inline-flex;
`;

export const Switch = styled.div`
box-sizing: border-box;
  position: relative;
  height: 20px;
  width: 32px;
  background: #e7e7f0;
  border-radius: 12px;
  padding: 2px 2px 2px 14px;
  transition: 300ms all;
  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 35px;
    top: 50%;
    left: 2px;
    background: #fff;
    transform: translate(0, -50%);
  }
`;

export const Input = styled.input`
  opacity: 0;
  position: absolute;
  width: 12px;
  height: 12px;
  &:checked + ${Switch} {
    background: #0fa457;
    &:before {
      transform: translate(calc(100% - 5px), -50%);
    }
  }
`;
