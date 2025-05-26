// import React from "react";
// import { connect } from "react-redux";
// import { getWidgetSpecificIsVisible } from "@utils/index";

// interface SidebarContainerProps {
//   is_visible?: boolean;
//   children?: React.ReactNode;
//   id?: string;
// }

// const mapStateToProps = (state: any, ownProps: any) => ({
//   is_visible: getWidgetSpecificIsVisible(
//     state.configuration?.normalisedConfig,
//     ownProps.id
//   )
// });

// export const SidebarContainer: React.FC<SidebarContainerProps> = ({
//   is_visible,
//   children
// }) => {
//   if (!is_visible) return null;

//   return(
//     <div>
//   {children}
//   </div>);
// };

// export default connect(mapStateToProps)(SidebarContainer);

import React from 'react';
import { connect } from 'react-redux';
import { getWidgetSpecificIsVisible } from '@utils/index';
import { SidebarWrapper } from './styles';

interface SidebarContainerProps {
  is_visible?: boolean;
  styles?: React.CSSProperties;
  children?: React.ReactNode;
}

const mapStateToProps = (state: any, ownProps: any) => ({
  is_visible: getWidgetSpecificIsVisible(
    state.configuration?.normalisedConfig,
    ownProps.id
  ),
  styles: state.configuration?.normalisedConfig?.[ownProps.id]?.props?.styles
});

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  is_visible,
  styles = {},
  children
}) => {
  if (!is_visible) return null;

  return (
    <SidebarWrapper style={styles}>
      {children}
    </SidebarWrapper>
  );
};

export default connect(mapStateToProps)(SidebarContainer);