import Button from "@acko-tech/building-blocks.ui.button-old";
import { $white, Box, styled } from "@acko-tech/building-blocks.ui.common";
import { Text } from "@acko-tech/building-blocks.ui.typography";

export const BUTTON_SUCCESS = "#0FA457";
export const BUTTON_DISABLED = "#C8D0DB";

export const ConfirmButton = styled(Button)`
  padding: ${(props: any) => props.padding};
  background: ${(props: any) =>
    props.disable ? BUTTON_SUCCESS : BUTTON_DISABLED};
  @media (min-width: 780px) {
    width: 200px;
  }
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: ${$white};
  border: none;
  outline: none;
  cursor: pointer;
  width: ${(props: any) => props.width};
  ${(props) => props.styles}
  &:hover {
    border: 0px;
    color: ${$white};
    background: ${(props: any) =>
      props.disable ? BUTTON_SUCCESS : BUTTON_DISABLED};
  }
`;

export const CueText = styled(Text)`
  margin-top: 12px;
  color: #5b5675;
  font-family: "Euclid Circular B";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  @media (max-width: 767px) {
    margin-top: unset;
    text-align: center;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  @media (min-width: 767px) {
    ${(props: { dWrapperStyles: any }) => props.dWrapperStyles}
  }
  ${(props: { wrapperStyles: any }) => props.wrapperStyles}
`;
