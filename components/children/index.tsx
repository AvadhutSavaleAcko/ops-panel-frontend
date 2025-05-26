import { styled } from "@acko-tech/building-blocks.ui.common";
import React, { Children, cloneElement } from "react";

const Container = styled.div`
  gap: 16px;
  @media (max-width: 768px) {
    gap: 12px;
    ${(props: { mStyles: any }) => props.mStyles}
  }
  ${(props: { styles: any }) => props.styles}
`;
const CloneChildren = ({ children, props, mStyles, styles }: any) => {
  const enhancedChildren = Children.map(children, (child) => {
    return cloneElement(child, { ...props });
  });

  return (
    <Container styles={styles} mStyles={mStyles}>
      {enhancedChildren}
    </Container>
  );
};

export default CloneChildren;
