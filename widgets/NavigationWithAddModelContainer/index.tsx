import React from "react";
import { connect } from "react-redux";
import { getWidgetSpecificIsVisible } from "@utils/index";

import { styled } from "@acko-tech/building-blocks.ui.common";

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

interface NavigationWithAddModelContainerProps {
  is_visible?: boolean;
  children?: React.ReactNode;
  id: string;
}

const mapStateToProps = (state: any, ownProps: any) => ({
  is_visible: getWidgetSpecificIsVisible(
    state.configuration?.normalisedConfig,
    ownProps.id
  )
});

export const NavigationWithAddModelContainer: React.FC<NavigationWithAddModelContainerProps> = ({
  is_visible,
  children
}) => {
  if (!is_visible) return null;

  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default connect(mapStateToProps)(NavigationWithAddModelContainer);

// import React from 'react';
// import { connect } from 'react-redux';
// import { getWidgetSpecificIsVisible, getWidgetSpecificProps } from '@utils/index';
// import {
//   DashboardContainer,
//   Sidebar,
//   NavList,
//   ContentSection,
//   TabTitle
// } from './styles';
// import { Table } from '../default_table';
// import { AddModelForm } from '../AddModelForm';

// interface NavigationWithAddModelContainerProps {
//   is_visible?: boolean;
//   children?: React.ReactNode;
//   id: string;
// }

// const mapStateToProps = (state: any, ownProps: any) => ({
//   is_visible: getWidgetSpecificIsVisible(
//     state.configuration?.normalisedConfig,
//     ownProps.id
//   ),
//   showForm: getWidgetSpecificProps(
//     state.configuration?.normalisedConfig,
//     'dashboard_nav',
//     'showForm'
//   ),
//   activeTab: getWidgetSpecificProps(
//     state.configuration?.normalisedConfig,
//     'dashboard_nav',
//     'activeTab'
//   ),
//   activeTabData: getWidgetSpecificProps(
//     state.configuration?.normalisedConfig,
//     'dashboard_nav',
//     'activeTabData'
//   )
// });

// export const NavigationWithAddModelContainer: React.FC<NavigationWithAddModelContainerProps> = ({
//   is_visible,
//   children,
//   showForm,
//   activeTab,
//   activeTabData
// }) => {
//   if (!is_visible) return null;

//   return (
//     <DashboardContainer>
//       <Sidebar>
//         <NavList>
//           {children}
//         </NavList>
//       </Sidebar>
//       <ContentSection>
//         {showForm ? (
//           <AddModelForm />
//         ) : (
//           activeTab && (
//             <>
//               <TabTitle>{activeTab}</TabTitle>
//               <Table data={activeTabData || []} />
//             </>
//           )
//         )}
//       </ContentSection>
//     </DashboardContainer>
//   );
// };

// export default connect(mapStateToProps)(NavigationWithAddModelContainer);