import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { styled } from "@acko-tech/building-blocks.ui.common";
import { getIsVisible } from "@utils/hooks/getIsVisible";

interface PageHeadingProps {
  id?: string;
  is_visible?: boolean;
  text?: string;
  dashBoardData: any;
}
const Heading = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
  text-transform: capitalize;
`;
export const PageHeading: React.FC<PageHeadingProps> = (props) => {
  // const tabName = useSelector(({ dashboardstate }: any) => {
  //   return dashboardstate?.activeTab;
  // });
  const { text } = props;
  const is_visible = getIsVisible({ id: props.id });

  return is_visible ? <Heading>{text}</Heading> : null;
};

export default PageHeading;
