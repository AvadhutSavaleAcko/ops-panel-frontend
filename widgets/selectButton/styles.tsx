import SelectButton from "@acko-tech/building-blocks.ui.select-button";
import {
  $primaryColorsGreen as $primaryColorsV2,
  $white,
  styled,
  $neutralColors,
  Flex,
} from "@acko-tech/building-blocks.ui.common";

export const Container = styled.div`
  justify-content: center;
  display: flex;
`;

const StyledSelect = styled(SelectButton)`
  border-radius: 8px;
  position: relative;
  // margin-bottom: 16px;
  padding: 14px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  flex-direction: row-reverse;
  background-color: ${(props: { disabled: any; selected: any }) => {
    let color = props.disabled ? $white : "#fff";
    if (props.selected) color = "#F3FAF7";
    return color;
  }};
  border: ${(props: { disabled: any; selected: any }) => {
    let color = props.disabled ? "#E0E2EB" : "#E7E7F0";
    color = props.selected ? "#0FA457" : color;
    return color !== "" ? `1px solid ${color}` : "none";
  }};
  color: ${(props: { selected: any; hasSubtext: any }) => `
    ${props.selected ? $neutralColors.dark : "#555A68"};
    ${props.hasSubtext ? "padding-left: 1em" : ""}
  `};
  ${(props: { disabled: any }) =>
    props.disabled &&
    `
    border-color: rgb(224, 226, 235);
    color: rgb(137, 144, 161);
    cursor: not-allowed;
  `}
  ${(props: { styles: any }) => props.styles}
  // width: fit-content;
  min-width: 120px;
  @media (max-width: 768px) {
    min-width: 98px;
  }
`;

export default StyledSelect;
