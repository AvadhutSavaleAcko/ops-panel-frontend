import React, {useState} from "react";
import { Container } from "./styles";
import {
  InfoCardContainer,
  Title,
  ItemsGrid,
  Item,
  Label,
  Value,
  ChildrenContainer,
  ToggleButton,
  ButtonText,
  ArrowIcon,
  CollapsibleContent
} from "./styles";

interface ProposalDetailsContainerProps {
  is_visible?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ProposalDetailsContainer: React.FC<
  ProposalDetailsContainerProps
> = ({ is_visible = true, className, children }) => {
  if (!is_visible) return null;

  return <Container className={className}>{children}</Container>;
};

export default ProposalDetailsContainer;

interface InfoCardProps {
  is_visible?: boolean;
  title: string;
  items: Array<{
    label: string;
    value: string | number;
  }>;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  is_visible = true,
  title,
  items,
  children
}) => {
  if (!is_visible) return null;

  return (
    <InfoCardContainer>
      <Title>{title}</Title>
      <ItemsGrid>
        {items.map((item, index) => (
          <Item key={index}>
            <Label>{item.label}</Label>
            <Value>{item.value}</Value>
          </Item>
        ))}
      </ItemsGrid>
      {children && <ChildrenContainer>{children}</ChildrenContainer>}
    </InfoCardContainer>
  );
};

interface CollapsibleInfoCardProps {
  is_visible?: boolean;
  title: string;
  items: Array<{
    label: string;
    value: string | number;
  }>;
}

export const CollapsibleInfoCard: React.FC<CollapsibleInfoCardProps> = ({
  is_visible = true,
  title,
  items
}) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!is_visible) return null;

  return (
    <div>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>
        <ButtonText>{title}</ButtonText>
        <ArrowIcon isOpen={isVisible}>▼</ArrowIcon>
      </ToggleButton>
      <CollapsibleContent isOpen={isVisible}>
        <InfoCard title={title} items={items} />
      </CollapsibleContent>
    </div>
  );
};
