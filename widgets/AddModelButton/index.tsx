// import React from "react";
// import { connect } from "react-redux";
// import { getWidgetSpecificIsVisible } from "@utils/index";
// import { AddModelButton as StyledButton } from "./styles";
// import actions from "@actions/actionsMap";

// interface AddModelButtonProps {
//   is_visible?: boolean;
//   label?: string;
//   actions;
// }

// const mapStateToProps = (state: any, ownProps: any) => ({
//   is_visible: getWidgetSpecificIsVisible(
//     state.configuration?.normalisedConfig,
//     ownProps.id
//   ),
//   label: state.configuration?.normalisedConfig?.[ownProps.id]?.props?.label
// });

// export const AddModelButton: React.FC<AddModelButtonProps> = ({
//   is_visible,
//   label,
//   actions
// }) => {
//   const { on_click, on_submit } = actions || {};
//   if (!is_visible) return null;
//   console.log("label", label);
//   console.log("actions", actions);
//   const handleClick = () => {
//     console.log("on_click", on_click);
//     if (on_click) {
//       on_click.forEach((action) => {
//         const actionFn = action.funCall;
//         console.log("actionFn", actionFn);

//         if (actionFn) {
//           actionFn(action.args);
//         }
//       });
//     }
//   };

//   return <StyledButton onClick={handleClick}>{label}</StyledButton>;
// };

// export default connect(mapStateToProps)(AddModelButton);
import React from "react";
import { connect } from "react-redux";
import { AddModelButton as StyledButton } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardData,
  clearDashboardData
} from "@store/slices/dashboardState";
import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";

interface AddModelButtonProps {
  id?: string;
  is_visible?: boolean;
  label?: string;
  dispatch?: any;
  actions?: {
    on_click?: Array<{
      funCall: Function;
      args: any;
    }>;
  };
}

const mapStateToProps = (state: any, ownProps: any) => ({
  is_visible:
    state.configuration?.normalisedConfig?.[ownProps.id]?.props?.is_visible,
  label:
    state.configuration?.normalisedConfig?.[ownProps.id]?.props?.label ||
    "+ Add Model",
  actions: state.configuration?.normalisedConfig?.[ownProps.id]?.actions
});

export const AddModelButton: React.FC<AddModelButtonProps> = ({
  is_visible = true,
  label,
  actions
}) => {
  if (!is_visible) return null;
  const dispatch = useDispatch();
  const { on_click} = actions || {};
  const handleClick = async ()  => {
      // on_click?.forEach((action) => {
      //   if (action && typeof action.funCall === "function") {
          
      //     action.funCall(action.args || {});
      //     dispatch(
      //       setDashboardData({
      //         activeTab: null,
      //         activeTabData: [],
      //         showForm: true,
      //         showConfigureModel: false
      //       })
      //     );
      //   }
      // });
          dispatch(
            setDashboardData({
              activeTab: null,
              activeTabData: [],
              showForm: false,
              showConfigureModel: false
            })
          );
      
          const payload = {
            requestBody: {
              expected_node: "add_model_form",
              journey: "ops_panel"
            },
            data: {
            }
          };
      
          await fetchConfigAndRedirect({
            ...payload,
            shouldRedirect: true,
            showBasicLoader: true,
            shouldClearStore: true,
            showCustomBasicLoader: true
          });
    };

  return <StyledButton onClick={handleClick}>{label}</StyledButton>;
};

export default connect(mapStateToProps)(AddModelButton);
