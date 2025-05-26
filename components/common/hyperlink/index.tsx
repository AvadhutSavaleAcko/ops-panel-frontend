import React from "react";
import { styled } from "@acko-tech/building-blocks.ui.common";
import { connect } from "react-redux";

import { getWidgetSpecificIsVisible } from "@utils/index";
import { CommonProps } from "@utils/interface";
import { Text } from "@acko-tech/building-blocks.ui.typography";

interface IHyperLink extends CommonProps {
  text: string;
  type: "PRIMARY" | "DANGER" | "UNDERLINE";
  clickHandler?: Function;
  dwebStyles?: any;
}

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const HyperLink = (props: IHyperLink) => {
  const {
    text,
    styles,
    actions,
    type,
    is_visible,
    clickHandler,
    id,
    dwebStyles
  } = props;

  const { on_click } = actions || {};

  const handleClick = () => {
    if (on_click?.length > 0) {
      on_click?.forEach((eachFunc: any) => {
        typeof eachFunc.funCall === "function" &&
          eachFunc.funCall(eachFunc.args || {});
      });
    }
    clickHandler && clickHandler();
  };

  const StyledText = styled(Text)`
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: #36354c;
    width: max-content;
    margin: 0px;
    display: inline;

    ${(props) => {
      switch (props.type) {
        case "PRIMARY":
          return `
          color: #1B73E8;
          `;
        case "DANGER":
          return `
          color: #D83D37;
          `;
        case "UNDERLINE":
          return `
          color: #36354c;
          text-decoration-line: underline;
          `;
      }
    }}

    :hover {
      cursor: pointer;
    }

    ${(props) => props.styles}
    @media(min-width: 767px) {
      ${(props) => props.dwebStyles}
    }
  `;

  return (id && is_visible) || !id ? ( // this check is specifically for hybrid components (which can be rendered from both configuation and from client)
    <StyledText
      type={type}
      styles={styles}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      dwebStyles={dwebStyles}
    >
      {text}
    </StyledText>
  ) : null;
};

export default connect(mapStateToProps)(HyperLink);
