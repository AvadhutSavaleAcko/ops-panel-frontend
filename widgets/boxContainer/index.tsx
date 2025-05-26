// import { getWidgetSpecificIsVisible } from "@utils/index";
// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { desktopRightContainerWidth } from "@utils/index";
// import { useOnload } from "@utils/useOnLoad";

// const mapStateToProps = function (state: any, ownProps: any) {
//   return {
//     is_visible: getWidgetSpecificIsVisible(
//       state.configuration?.normalisedConfig,
//       ownProps.id
//     )
//   };
// };

// const BoxContainer = ({ children, ...props }: any) => {
//   const { is_visible, styles, actions, wrapperStyles, mStyles } = props;

//   const { on_load } = actions || {};

//   useOnload({ on_load });

//   return is_visible ? (
//     <div className="form-container" {...props} style={wrapperStyles}>
//       <div className="children-container" style={styles}>
//         {children}
//       </div>
//       <style jsx>
//         {`
//           .form-container {
//             padding: 32px;
//             border-radius: 16px;
//             border: 1px solid #efe9fb;
//             background: #fff;
//             width: ${desktopRightContainerWidth};
//             height: max-content;
//             overflow: visible;
//             box-sizing: border-box;
//             margin-bottom: 140px;
//           }

//           .children-container {
//             width: 100%;
//             display: inline-flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 32px;
//           }

//           @media (max-width: 768px) {
//             .form-container {
//               border: unset;
//               border-radius: 0px;
//               padding: 0px 20px 260px;
//               width: 100%;
//               overflow: visible;
//               margin-bottom: 0px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   ) : (
//     <></>
//   );
// };

// export default connect(mapStateToProps)(BoxContainer);

// import React from 'react';
// import { connect } from 'react-redux';
// import { getWidgetSpecificIsVisible } from '@utils/index';
// import { styled } from '@acko-tech/building-blocks.ui.common';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   position: relative;
// `;

// interface BoxContainerProps {
//   id?: string;
//   is_visible?: boolean;
//   children?: React.ReactNode;
//   tableData?: any[];
//   currentTab?: string;
//   styles?: React.CSSProperties;
// }

// const mapStateToProps = (state: any, ownProps: any) => ({
//   is_visible: getWidgetSpecificIsVisible(
//     state.configuration?.normalisedConfig,
//     ownProps.id
//   ),
//   tableData: state.global?.activeTabData,
//   currentTab: state.global?.activeTab,
//   styles: state.configuration?.normalisedConfig?.[ownProps.id]?.props?.styles
// });

// export const BoxContainer: React.FC<BoxContainerProps> = ({
//   is_visible = true,
//   children,
//   styles = {}
// }) => {
//   if (!is_visible) return null;

//   return <Container style={styles}>{children}</Container>;
// };

// export default connect(mapStateToProps)(BoxContainer);

import React from "react";
import { connect } from "react-redux";
import { getWidgetSpecificIsVisible } from "@utils/index";
import styled from "styled-components";
import { Table } from "../default_table";
import { PageHeading } from "../pageHeading";
import { AddModelForm } from "../AddModelForm";
const Container = styled.div<{ customStyles?: React.CSSProperties }>`
  ${(props) => ({ ...props.customStyles })}
`;

interface BoxContainerProps {
  id?: string;
  is_visible?: boolean;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  tableData?: any[];
  currentTab?: string;
  showForm?: boolean;
}

// const mapStateToProps = (state: any, ownProps: any) => ({
//   // console.log('State from mapStateToProps:', {
//   //   tableData: state.globalState.activeTabData,
//   //   currentTab: state.globalState.activeTab
//   // }),
//   is_visible: getWidgetSpecificIsVisible(
//     state.configuration?.normalisedConfig,
//     ownProps.id
//   ),
//   styles: state.configuration?.normalisedConfig?.[ownProps.id]?.props?.styles,
//   tableData: state.global?.activeTabData ,
//   currentTab: state.global?.activeTab

// });
// interface TableProps {
//   data: any[];
// }

// interface PageHeadingProps {
//   text: string;
// }
// export const BoxContainer: React.FC<BoxContainerProps> = ({
//   is_visible = true,
//   children,
//   styles = {},
//   tableData,
//   currentTab
// }) => {
//   if (!is_visible) return null;

//   const updatedChildren = React.Children.map(children, child => {
//     if (React.isValidElement(child)) {
//       if (child.type === 'default_table') {
//         return React.cloneElement<TableProps>(child as React.ReactElement<TableProps>, {
//           data: tableData || []
//         });      }
//       if (child.type === 'page_heading') {
//         return React.cloneElement<PageHeadingProps>(child as React.ReactElement<PageHeadingProps>, {
//           text: currentTab || ''
//         });
//       }
//     }
//     return child;
//   });

//   return <Container customStyles={styles}>{updatedChildren}</Container>;
// };

// export default connect(mapStateToProps)(BoxContainer);

const mapStateToProps = (state: any, ownProps: any) => ({
  is_visible: getWidgetSpecificIsVisible(
    state.configuration?.normalisedConfig,
    ownProps.id
  )
});

const BoxContainer: React.FC<BoxContainerProps> = ({
  is_visible,
  children,
  styles = {},
  tableData,
  currentTab,
  showForm
}) => {
  if (!is_visible) return null;

  return <Container customStyles={styles}>{children}</Container>;
};

export default connect(mapStateToProps)(BoxContainer);
