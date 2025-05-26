import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  margin-top: -12px;
  // margin-right: 2rem;
  ${(props: { styles: any }) => props.styles}// @media(max-width: 768px) {
  //   width: 90%;
  //   margin-right: 0;
  // }
`;

export const CueTextContainer = styled.div`
  display: flex;
  padding: 16px;
  align-items: flex-start;
  gap: 3px;
  align-self: stretch;
  border-radius: 0px 0px 12px 12px;
  background: #f2f9ff;
  margin-left: 1px;
  color: #040222;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;
