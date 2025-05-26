import React, { useEffect, useState } from "react";
import styles from "./SelectButton.module.css";
import {
  $fontWeightNormal,
  $primaryColors,
} from "@acko-tech/building-blocks.ui.common";
import StyledSelect, { Container } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setPayloadData } from "@store/slices/globalState";
import {
  getWidgetSpecificIsVisible,
  updateStateBasedOnFieldChange,
} from "@utils/index";

import { connect } from "react-redux";
import { setAnalytics } from "@actions/setAnalyticsData";
import { useOnload } from "@utils/useOnLoad";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id,
    ),
  };
};

const SelectButton = (props: any) => {
  const dispatch = useDispatch();

  const {
    label,
    option,
    onSelect,
    is_visible,
    actions,
    value,
    payloadData,
    parentId,
    preSelectedValue,
    styles,
  } = props || {};
  const { on_click } = actions || [];

  const { selectedOption } = useSelector(({ globalState }: any) => {
    return {
      selectedOption: globalState?.payloadData?.[payloadData?.name],
    };
  });

  const { on_load } = actions || {};

  useOnload({ on_load });

  useEffect(() => {
    if (value === selectedOption) {
      // mocking handle click to show hide page level comps based on already present value in config
      handleClick();
    }
  }, [selectedOption, value]);

  const handleClick = () => {
    // const { configuration } = store.getState() || {};
    // const { normalisedConfig } = configuration || {}
    // const updatedNormalisedConfig = JSON.parse(
    //   JSON.stringify(normalisedConfig),
    // );
    // const data = updatedNormalisedConfig[parentId];
    // data.props.error_message = '';
    // dispatch(updateNormalisedConfig({
    //   normalisedConfig: updatedNormalisedConfig,
    // }));

    updateStateBasedOnFieldChange(parentId);
    dispatch(
      setPayloadData({
        [payloadData?.name]: value,
      }),
    );
    setAnalytics({
      [payloadData?.name]: value,
    });

    on_click?.forEach((action) => {
      if (action && typeof action.funCall === "function") {
        action.funCall(action.args || {});
      }
    });
  };

  return is_visible ? (
    <StyledSelect
      selected={value === selectedOption}
      handleClick={handleClick}
      key={label}
      hideSelectIcon
      value={label?.toString()}
      theme={{
        primaryColor: $primaryColors,
        normalWeight: $fontWeightNormal,
      }}
      styles={styles}
    >
    </StyledSelect>
  ) : (
    <></>
  );
};

export default connect(mapStateToProps)(SelectButton);
