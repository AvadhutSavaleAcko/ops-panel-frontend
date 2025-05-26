// styles.tsx
import styled from "styled-components";

export const TooltipTarget = styled.div`
  position: relative;
`;

export const TooltipBox = styled.div`
  position: absolute;
  box-sizing: border-box;
  bottom: calc(100% + 20px);
  background: #040222;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 194px;
  height: 99px;
  z-index: 1000;
  padding: 12px 12px 16px 16px;
 

  @media (min-width: 768px) {
    width: 320px;
    height: 50px;
    align-items: center;
    left: 0%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 16px;
  }
`;

export const TooltipContent = styled.div`
  font-size: 14px;
  line-height: 20;
  font-weight: 400;
  line-height: 18px;
  color: #e0e0e8;
  margin-right: 8px;
  max-width: 168px;
  span {
    font-size: 14px;
    font-weight: 600;
    color: #ebfbee;
  }

  @media (min-width: 768px) {
    min-width: 260px;
    font-size: 12px;
  }


`;

export const TooltipArrow = styled.div`
  position: absolute;
  bottom: -10px;
  left: 20%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid #0a0b3a;

  @media (min-width: 768px) {
    left: 10%;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0px;
  align-self: right;
  justify-content: flex-end;
  display: flex;
  width: 100%;
`;
