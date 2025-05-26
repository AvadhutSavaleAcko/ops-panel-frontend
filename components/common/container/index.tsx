import React from "react";
import { connect } from "react-redux";
import { styled } from "@acko-tech/building-blocks.ui.common";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { CommonProps } from "@utils/interface";
import { useOnload } from "@utils/useOnLoad";

interface IContainer extends CommonProps {}

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const StyledBox = styled.div`
  ${(props) => props.styles}
  @media(max-width: 768px) {
    ${(props) => props.mStyles}
  }
`;

const Container = ({ children, ...props }: IContainer) => {
  const { styles, actions, is_visible, id, mStyles } = props;

  const { on_click, on_load } = actions || {};

  useOnload({ on_load });

  const handleClick = () => {
    if (on_click?.[0] && typeof on_click[0].funCall === "function") {
      on_click[0].funCall(on_click[0].args || {});
    }
  };

  return (id && is_visible) || !id ? (
    <StyledBox styles={styles} mStyles={mStyles} onClick={handleClick}>
      {children}
    </StyledBox>
  ) : null;
};

export default connect(mapStateToProps)(Container);
