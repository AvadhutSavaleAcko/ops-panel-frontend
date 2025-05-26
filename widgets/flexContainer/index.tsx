// import { Flex } from "@acko-tech/building-blocks.ui.common";
// import { getWidgetSpecificIsVisible } from "@utils/index";
// import React, { useContext } from "react";
// import { connect } from "react-redux";
// import { Context } from "@components/useContext/context";

// const mapStateToProps = function (state: any, ownProps: any) {
//   return {
//     is_visible: getWidgetSpecificIsVisible(
//       state.configuration?.normalisedConfig,
//       ownProps.id
//     )
//   };
// };

// const FlexContainer = ({ children, ...props }: any) => {
//   const { isDesktop } = useContext(Context);
//   const { id, styles, is_visible } = props;
//   const {
//     justifyContent = "center",
//     alignItems = "flex-start",
//     flexDirection = "row"
//   } = styles || {};

//   if (!is_visible) return null;

//   return (
//     <Flex
//       justifyContent={justifyContent}
//       flexDirection={flexDirection}
//       alignItems={alignItems}
//       style={{
//         background: isDesktop && "#F8F7FC",
//         padding: isDesktop && "32px 0px 0px",
//         minHeight: isDesktop ? "calc(100vh - 100px)" : "calc(100vh - 60px)",
//         height: "max-content",
//         ...styles
//       }}
//     >
//       {children}
//     </Flex>
//   );
// };

// export default connect(mapStateToProps)(FlexContainer);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getWidgetSpecificIsVisible } from "@utils/index";
import styled from "styled-components";

const Container = styled.div<{ customStyles?: React.CSSProperties }>`
  display: flex;
  ${(props) => ({ ...props.customStyles })}
`;

interface FlexContainerProps {
  id?: string;
  is_visible?: boolean;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
}

const mapStateToProps = (state: any, ownProps: any) => ({
  is_visible: getWidgetSpecificIsVisible(
    state.configuration?.normalisedConfig,
    ownProps.id
  )
});

export const FlexContainer: React.FC<FlexContainerProps> = ({
  is_visible,
  children,
  styles = {}
}) => {
  if (!is_visible) return null;

  return <Container customStyles={styles}>{children}</Container>;
};

export default connect(mapStateToProps)(FlexContainer);
