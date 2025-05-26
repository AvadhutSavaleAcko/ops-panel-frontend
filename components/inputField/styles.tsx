//@ts-nocheck
import {
  styled,
  $fontWeightLight,
  $fontSize,
  $error,
} from "@acko-tech/building-blocks.ui.common";
import { Text } from "@acko-tech/building-blocks.ui.typography";

// TODO: CHECK WHERE CAN WE STORE THESE IMAGES
// IN PUBLIC FOLDER OR IN BIT.DEV ?
// const ChevronDown = dynamic(
//   () => import("@public/images/icons/chevron-down.svg"),
//   { ssr: true }
// );

export const Input = styled.input`
  border: 1px solid #d6d9e0;
  border-radius: 8px;
  padding: 1.18em 3em 1.18em 1em;
  font-family: "Euclid Circular B";
  width: 100%;
  height: 100%;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ::placeholder {
    font-weight: 400;
    font-size: ${$fontSize.xs};
    line-height: 24px;
    color: #5b5675;
    text-transform: none;
  }
  :focus {
    border: 1px solid #4f34d2;
  }
  color: #040222;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  text-transform: ${(props) => (props.autoCapitalize ? "uppercase" : "none")};
  ${(props) => props.isDesktop && "height: 55px"}
  ${(props) => props.pointerCursor && "cursor: pointer"}
  ${(props) => props.leftPadding && "padding: 1.18em 3em 1.18em 3.5em;"}
  ${(props) => props.isPrefix && "padding-left: 38px"}
  ${(props) => props.styles}
`;

export const Label = styled(Text)`
  font-weight: ${$fontWeightLight};
  font-size: ${$fontSize.xxs};
  line-height: 18px;
  letter-spacing: 0.04em;
  display: inline-block;
  background-color: white;
  padding: 0 5px;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0.8em, -0.6em);
  color: ${(props) => (props.focused ? "#4f34d2" : "#5B5675")};
  ${Input}:placeholder-shown ~ & {
    visibility: hidden;
    opacity: 0;
    transform: translate(0.8em, 1.4em);
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-top: ${(props) => (props.isDesktop ? "1.875rem" : "1.5rem")};
  width: 100%;
  ${(props) => props.styles}
`;

export const Note = styled(Text)`
  color: #5b5675;
  padding: 8px 0 0 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

export const ErrorText = styled(Text)`
  line-height: 16px;
  width: 90%;
  color: ${$error};
  font-size: 12px;
  font-weight: 400;
  margin: ${(props) => props.margin && props.margin};
  text-align: left;
`;

export const DropDown = styled.div`
  width: 0.55em;
  height: 0.55em;
  transform: rotate(45deg);
  border-right: 1.5px solid #151619;
  border-bottom: 1.5px solid #151619;
  display: inline;
  position: absolute;
  top: 40%;
  right: 1.5em;
  cursor: pointer;
`;

export const MobilePrefix = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  font-size: ${$fontSize.xs};
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  position: absolute;
  right: 16px;
  top: 28%;

  @media (max-width: 767px) {
    ${(props) => props.iconStyles}
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
