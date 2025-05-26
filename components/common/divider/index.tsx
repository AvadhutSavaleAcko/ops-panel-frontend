import React from "react";
import { connect } from "react-redux";
import { styled } from "@acko-tech/building-blocks.ui.common";

import { getWidgetSpecificIsVisible } from "@utils/index";
import { CommonProps } from "@utils/interface";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

interface IDivider extends CommonProps {}

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  border-top: 1px dashed #efe9fb;
  margin-top: 1rem;
  margin-bottom: 1rem;

  ${(props) => props.styles}
`;

const SectionDivider = (props: IDivider) => {
  const { is_visible, styles, id } = props;

  return (id && is_visible) || !id ? <Divider styles={styles} /> : null;
};

export default connect(mapStateToProps)(SectionDivider);
