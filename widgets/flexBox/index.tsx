import { Flex } from "@acko-tech/building-blocks.ui.common";
import { getWidgetSpecificIsVisible } from "@utils/index";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const FlexBox = (props) => {

  const { children, styles } = props || {};
  const {
    justifyContent,
    alignItems,
    flexDirection
  } = styles || {};
  console.log("propsasdas", props)

  return (
    <Flex
      flexDirection={flexDirection || "center"}
      justifyContent={justifyContent || "column"}
      alignItems={alignItems || "center"}
      padding="0px"
    >
      {children}
    </Flex>
  );
};

export default connect(mapStateToProps)(FlexBox);
