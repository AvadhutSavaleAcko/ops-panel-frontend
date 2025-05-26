// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { getWidgetSpecificIsVisible } from "@utils/index";
// import { Table } from "../default_table";
// import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";
// import { AddModelForm } from "../AddModelForm";
// import { ConfigureNewModel } from "../ConfigureNewModel";
// import {
//   DashboardContainer,
//   Sidebar,
//   NavList,
//   ContentSection,
//   TabTitle,
//   AddModelButton
// } from "./styles";

// interface NavigationChildProps {
//   activeTab: string | null;
//   onTabClick: (tabName: string, data: any[]) => void;
//   id?: string;
// }

// const mapStateToProps = (state: any, ownProps: any) => ({
//   is_visible: getWidgetSpecificIsVisible(
//     state.configuration?.normalisedConfig,
//     ownProps.id
//   )
// });

// interface NavigationContainerProps {
//   is_visible?: boolean;
//   children?: React.ReactNode;
//   dataToConfigureNewModel?: any;
// }

// export const NavigationContainer: React.FC<NavigationContainerProps> = ({
//   is_visible,
//   children,
//   dataToConfigureNewModel
// }) => {
//   const firstChild = React.Children.toArray(
//     children
//   )[0] as React.ReactElement<any>;
//   const [showForm, setShowForm] = useState(true);
//   const [showConfigureModel, setShowConfigureModel] = useState(false);

//   useEffect(() => {
//     if (dataToConfigureNewModel && Object.keys(dataToConfigureNewModel).length > 0) {
//       setShowConfigureModel(true);
//       setShowForm(false);
//     } else {
//       setShowConfigureModel(false);
//       if (!activeTab) {
//         setShowForm(true);
//       }
//     }
//   }, [dataToConfigureNewModel]);

//   const firstTabName = firstChild?.props?.data?.props?.tab_name;
//   const firstTabData = firstChild?.props?.data?.props?.defaultList || [];

//   const [activeTab, setActiveTab] = useState<string | null>(null);
//   const [activeTabData, setActiveTabData] = useState<any[]>([]);
//   const handleTabClick = (tabName: string, data: any[]) => {
//     setActiveTab(tabName);
//     setActiveTabData(data);
//     setShowForm(false);
//     setShowConfigureModel(false);
//   };

//   useEffect(() => {
//     console.log("useEffect - Conditions:", {
//       firstTabName,
//       hasFirstTabData: firstTabData?.length > 0,
//       activeTab
//     });

//     if (firstTabName && firstTabData && !activeTab) {
//       handleTabClick(firstTabName, firstTabData);
//     }
//   }, [firstTabName, firstTabData]);

//   console.log("Render State:", { activeTab, activeTabData });

//   const handleModelClick = () => {
//     setShowForm(true);
//     setShowConfigureModel(false);
//     setActiveTab(null);
//     setActiveTabData([]);
//   };
//   if (!is_visible) return null;
//   const handleFormSubmit = async (formData: any) => {
//     const payload = {
//       requestBody: {
//         current_node: "common_dashboard",
//         expected_node: "common_dashboard",
//         journey: "ops_panel"
//       },
//       data: formData
//     };

//     await fetchConfigAndRedirect({
//       ...payload,
//       shouldRedirect: true,
//       showBasicLoader: true,
//       shouldClearStore: true,
//       showCustomBasicLoader: true
//     });
//   };

//   return (
//     <>
//       <DashboardContainer>
//         <Sidebar>
//           <NavList>
//             {React.Children.map(children, (child) => {
//               if (React.isValidElement(child)) {
//                 return React.cloneElement(
//                   child as React.ReactElement<NavigationChildProps>,
//                   {
//                     activeTab,
//                     onTabClick: handleTabClick
//                   }
//                 );
//               }
//               return child;
//             })}
//             <AddModelButton onClick={handleModelClick}>
//               + Add Model
//             </AddModelButton>
//           </NavList>
//         </Sidebar>

//         <ContentSection>
//           {showConfigureModel && dataToConfigureNewModel ? (
//             <ConfigureNewModel data={dataToConfigureNewModel} />
//           ) : showForm ? (
//             <AddModelForm
//               onSubmit={handleFormSubmit}
//               onCancel={() => setShowForm(false)}
//             />
//           ) : (
//             activeTab && (
//               <>
//                 <TabTitle>{activeTab}</TabTitle>
//                 <Table data={activeTabData} />
//               </>
//             )
//           )}
//         </ContentSection>
//       </DashboardContainer>
//     </>
//   );
// };

// export default connect(mapStateToProps)(NavigationContainer);

import React from "react";
import { connect } from "react-redux";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { NavList } from "./styles";

interface NavigationChildProps {
  activeTab?: string | null;
  globalData?: any;
}

interface NavigationContainerProps {
  id?: string;
  is_visible?: boolean;
  children?: React.ReactNode;
  actions?: {
    on_load?: any[];
  };
  dispatch?: any;
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    ),
    actions: state.configuration?.normalisedConfig?.[ownProps.id]?.actions
  };
};

export const NavigationContainer: React.FC<NavigationContainerProps> = ({
  is_visible,
  children
}) => {
  // useEffect(() => {
  //   if (actions?.on_load) {
  //     actions.on_load.forEach((action: any) => {
  //       if (action.funCall === "setGlobalData") {
  //         dispatch({
  //           type: "SET_GLOBAL_DATA",
  //           payload: action.args
  //         });
  //       }
  //     });
  //   }
  // }, []);
  if (!is_visible) return null;

  return <NavList>{children}</NavList>;
};

export default connect(mapStateToProps)(NavigationContainer);
