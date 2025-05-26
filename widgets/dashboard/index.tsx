import React, { useState } from "react";
import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";
import { PanelContainer, Sidebar, Content } from "./styles";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { connect } from "react-redux";

interface NavItem {
  id: string;
  label: string;
  searchTypes: Array<{
    id: string;
    label: string;
    placeholder: string;
  }>;
}
const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};
interface PanelProps {
  is_visible?: boolean;
  defaultActiveNav?: string;
  showSearchByDefault?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({
  is_visible = true,
  defaultActiveNav,
  showSearchByDefault = true,
  className,
  children
}) => {
  if (!is_visible) return null;

  const [activeNav, setActiveNav] = useState(defaultActiveNav || "proposals");
  const [showSearch, setShowSearch] = useState(showSearchByDefault);
  const [searchValue, setSearchValue] = useState("");
  console.log("Panel component rendered");
  console.log("defaultActiveNav:", defaultActiveNav);
  console.log("Show Search:", showSearch);
  // Extract nav and search components from config
  // const navConfig = config.children.find((child) => child.type === "navigation")
  //   ?.data.props;
  // const searchConfig = config.children.find((child) => child.type === "search")
  //   ?.data.props;

  // const currentNavItem = navConfig?.navItems?.find(
  //   (item: NavItem) => item.id === activeNav
  // );

  const handleSearch = async () => {
    const payload = {
      requestBody: {
        current_node: "dashboard",
        expected_node: `${activeNav}_list`,
        journey: "ops_panel"
      },
      data: {
        // search_value: searchValue,
        // search_type: currentNavItem?.searchTypes[0].id
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
    <PanelContainer className={className}>
      {children}
      {/* <Navigation
          is_visible={navConfig?.is_visible}
          items={navConfig?.navItems || []}
          activeItem={activeNav}
          onItemClick={(id) => {
            setActiveNav(id);
            setShowSearch(true);
          }}
        /> */}
      {/* </Sidebar> */}
      {/* <Content>
        {showSearch && currentNavItem && searchConfig?.is_visible && (
          <Search
            is_visible={true}
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            searchTypes={currentNavItem.searchTypes}
            showDropdown={currentNavItem.searchTypes.length > 1}
          />
        )}
      </Content> */}
    </PanelContainer>
  );
};

export default connect(mapStateToProps)(Panel);