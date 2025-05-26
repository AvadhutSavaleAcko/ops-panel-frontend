import React, { useEffect } from "react";
import { Box, styled } from "@acko-tech/building-blocks.ui.common";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { connect } from "react-redux";
import { useOnload } from "@utils/useOnLoad";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const LeftContainer = styled(Box)`
  width: 20%;
  height: max-content;
  position: sticky;
  top: 50px;

  @media (max-width: 768px) {
    display: none;
  }

  ${(props: { styles: any }) => props.styles};
`;

const LeftNavigation = (props: any) => {
  const { steps, is_visible, actions } = props;
  const { on_load } = actions || {};

  useOnload({ on_load });

  return is_visible ? (
    <LeftContainer>
    </LeftContainer>
  ) : (
    <></>
  );
};

export default connect(mapStateToProps)(LeftNavigation);
