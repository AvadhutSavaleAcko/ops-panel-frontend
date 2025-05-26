import React, { useState } from "react";
import { connect } from "react-redux";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { NavButton, LoaderWrapper } from "./styles";
import { useDispatch } from "react-redux";
import { setDashboardData } from "@store/slices/dashboardState";
import { BasicLoader } from "@acko-tech/building-blocks.ui.loaders";
import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";

interface NavigationProps {
  id?: string;
  is_visible?: boolean;
  tab_name?: string;
  defaultList?: any[];
  activeTab?: string | null;
  actions;
  dispatch?: any;
  globalData?: any;
}

const mapStateToProps = (state: any, ownProps: any) => ({
  is_visible: getWidgetSpecificIsVisible(
    state.configuration?.normalisedConfig,
    ownProps.id
  )
});

export const Navigation: React.FC<NavigationProps> = ({
  is_visible,
  tab_name = "",
  defaultList = [],
  activeTab,
  actions
}) => {
  if (!is_visible) return null;
  const dispatch = useDispatch();
  const { on_click } = actions || {};
  const isActive = activeTab === tab_name;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    dispatch(
      setDashboardData({
        activeTab: tab_name,
        activeTabData: [...defaultList],
        showForm: false,
        showConfigureModel: false
      })
    );

    const payload = {
      requestBody: {
        current_node: "common_dashboard",
        expected_node: "default_list",
        journey: "ops_panel"
      },
      data: {
        tab_name: tab_name
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

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <LoaderWrapper>
          <BasicLoader />
        </LoaderWrapper>
      )}
      <NavButton isActive={isActive} onClick={handleClick} disabled={isLoading}>
        {tab_name}
      </NavButton>
    </div>
  );
};

export default connect(mapStateToProps)(Navigation);
