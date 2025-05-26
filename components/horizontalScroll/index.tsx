import React from "react";
import { connect } from "react-redux";

import { Wrapper, Container } from "./styles";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { CommonProps } from "@utils/interface";

interface IHorizontalScroll extends CommonProps {}

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const HorinzontalScroll = (props: IHorizontalScroll) => {
  const { children, styles, is_visible, id } = props;
  return (id && is_visible) || !id ? (
    <Wrapper>
      <Container styles={styles}>{children}</Container>
    </Wrapper>
  ) : null;
};

export default connect(mapStateToProps)(HorinzontalScroll);
