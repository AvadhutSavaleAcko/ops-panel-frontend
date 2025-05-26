import {
  Dropdown,
  IDropdownListItem,
} from "@acko-tech/building-blocks.ui.dropdown";
import { DropdownWrapper } from "./styles";
import {
  AckoMainTheme,
  ThemeProvider,
} from "@acko-tech/building-blocks.ui.theme";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getWidgetSpecificIsVisible,
  updateStateBasedOnFieldChange,
} from "@utils/index";
import { setPayloadData } from "@store/slices/globalState";
import { connect } from "react-redux";
import { Context } from "@components/useContext/context";
import { Box } from "@acko-tech/building-blocks.ui.common";
import { setAnalytics } from "@actions/setAnalyticsData";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id,
    ),
  };
};

export type CommonOptionProps = {
  displayValue: string;
  value: string;
};

// type Props = {
//   value: IDropdownListItem | null;
//   actions: (option: string | IDropdownListItem) => void;
//   options: CommonOptionProps[];
//   label: string;
//   heading: string;
//   returnFullOption?: boolean;
//   hideHeader?: boolean;
//   hideClose?: boolean;
//   showLabelAfterSelect?: boolean;
//   className?: string;
//   is_visible: boolean;
//   payloadData: { [key: string]: unknown}
//   parentId: string
//   id: string
// };

const DropDown = ({
  options,
  value,
  actions,
  label,
  heading,
  hideHeader,
  returnFullOption = false,
  hideClose,
  showLabelAfterSelect = true,
  is_visible,
  payloadData,
  id,
  parentId,
  children,
}: any) => {
  const dispatch = useDispatch();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>();
  const selectedValue = payloadData?.value;

  useEffect(() => {
    if (selectedValue) {
      setSelectedDropdownValue({
        value: selectedValue,
        displayValue: selectedValue,
      });
    }
  }, [selectedValue]);

  const { on_click } = actions || {};
  const { isDesktop } = useContext(Context);
  const handleChange = (options: IDropdownListItem) => {
    // const selectedOption = returnFullOption ? options : options.value;
    updateStateBasedOnFieldChange(parentId || id);
    dispatch(
      setPayloadData({
        [payloadData?.name]: options.value,
      }),
    );
    setAnalytics({
      [payloadData?.name]: options.value,
    });
  };
  // const selectedValue = {
  //   value: value,
  //   displayValue: value,
  // };

  const handleOnClick = () => {
    if (on_click?.[0] && typeof on_click[0].funCall === "function") {
      on_click?.forEach((eachFunc: any) => {
        eachFunc.funCall(eachFunc.args);
      });
    }
  };

  return is_visible ? (
    <Box onClick={handleOnClick}>
      <ThemeProvider theme={AckoMainTheme}>
        <DropdownWrapper>
          <Dropdown
            value={selectedDropdownValue}
            heading={heading}
            label={label}
            options={options}
            hideClose={hideClose}
            onChange={handleChange}
            className={isDesktop ? "dropdownDesktop" : "dropdownMobile"}
          />
        </DropdownWrapper>
      </ThemeProvider>
      {children}
    </Box>
  ) : null;
};

export default connect(mapStateToProps)(DropDown);
