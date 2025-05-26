import { styled } from "@acko-tech/building-blocks.ui.common";

export const Wrapper = styled.div`
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  height: 100%;

  & > :first-child {
    margin-left: 0px;
  }

  ${(props) => props.styles}
`;
