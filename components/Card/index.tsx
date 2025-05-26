import React, { useEffect } from "react";
import Card from "@acko-tech/building-blocks.ui.card";
import { styled } from "@acko-tech/building-blocks.ui.common";

// TODO Refractor
const CardContainer = styled(Card)`
  width: 100%;
  height: fit-content;
  padding: 0;
  padding-bottom: 1em;
  ${(props: any) => props.styles}
  @media (min-width: 768px) {
    padding-left: 0;
    padding-bottom: 0;
    padding-top: 0;
    ${(props: any) => props.styles}
  }
`;

interface PropsInterface {
  onMount?: Function;
  styles?: string;
  id?: string;
}

const QuestionCard = ({
  children,
  styles,
  onMount,
  id,
}: React.PropsWithChildren<PropsInterface>) => {
  useEffect(() => {
    if (onMount) onMount();
  }, []);
  return (
    <CardContainer styles={styles} id={id}>
      {children}
    </CardContainer>
  );
};

export default QuestionCard;
