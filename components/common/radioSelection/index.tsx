import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";

import { Input, Label, Switch } from "./styles";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { CommonProps } from "@utils/interface";
interface IRadioSelection extends CommonProps {
  selected: boolean;
  clickHandler?: Function;
}

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const RadioSelection = ({
  clickHandler,
  selected,
  id,
  is_visible
}: IRadioSelection) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    clickHandler && clickHandler(e.target.checked);
  };

  return (id && is_visible) || !id ? (
    <Label>
      <Input checked={checked} type="checkbox" onChange={handleChange} />
      <Switch />
    </Label>
  ) : null;
};

export default connect(mapStateToProps)(RadioSelection);
