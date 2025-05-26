import React, { useContext } from "react";
import { Context } from "@components/useContext/context";

import { styled } from "@acko-tech/building-blocks.ui.common";
import { resolvePath } from "@utils/resolvePath";

export const Wrapper = styled.div`
  background-image: url(${resolvePath("/images/headerGradient.svg")});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 160px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  ${(props: { isAddonGradient: any; }) =>
    props.isAddonGradient ?
      `
      background-image: url(${resolvePath("/images/addon-header-gradient.svg")});
      height: 216px;
    ` : `background-image: url(${resolvePath("/images/headerGradient.svg")});`}
    ;
  }
`;

const GradientHeader = (props) => {
  const { isAddonGradient = false } = props || {};
  const { isDesktop } = useContext(Context);
  return isDesktop ? null : <Wrapper isAddonGradient={isAddonGradient} />;
};

export default GradientHeader;
