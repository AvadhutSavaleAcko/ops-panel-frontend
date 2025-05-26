import React from "react";

import { styled } from "@acko-tech/building-blocks.ui.common";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { connect } from "react-redux";
import { CommonProps } from "@utils/interface";

const mapStateToProps = function (state: any, ownProps: any) {
    return {
        is_visible: getWidgetSpecificIsVisible(
            state.configuration?.normalisedConfig,
            ownProps.id
        )
    };
};

interface IDivider extends CommonProps { }

export const Divider = styled.div`
  height: 1px;
  border-top: 1px solid #efe9fb;
  margin-top: 1rem;
  margin-bottom: 1rem;

//   ${(props) => props.styles}
`;

const SectionDivider = (props: IDivider) => {
    const { is_visible, styles, id } = props;

    return <Divider />
};

export default connect(mapStateToProps)(SectionDivider);