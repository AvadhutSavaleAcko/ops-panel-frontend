import React from "react";
import styled from "styled-components";
import { RSATPAccessoryProps } from "./types";

const Container = styled.div<{ isSelected: boolean }>`
  border: 1px solid ${(props) => (props.isSelected ? "#1890FF" : "#E8E8E8")};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: ${(props) => (props.isSelected ? "#F6F6F6" : "#FFFFFF")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1890ff;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const Badge = styled.div<{ type: string }>`
  background: ${(props) => (props.type === "PREMIUM" ? "#FFF7E6" : "#F6F6F6")};
  color: ${(props) => (props.type === "PREMIUM" ? "#FA8C16" : "#262626")};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const Heading = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #262626;
`;

const Content = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const Details = styled.div`
  flex: 1;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
`;

const GST = styled.div`
  font-size: 12px;
  color: #8c8c8c;
`;

const SumAssured = styled.div`
  font-size: 14px;
  color: #8c8c8c;
  margin-top: 8px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: #1890FF;
    color: #FFFFFF;
    &:hover {
      background: #40A9FF;
    }
  `
      : `
    background: #F5F5F5;
    color: #262626;
    &:hover {
      background: #E8E8E8;
    }
  `}
`;

const RSATPAccessory: React.FC<RSATPAccessoryProps> = ({
  badge,
  heading,
  coverImage,
  removeCtaText,
  primaryCtaText,
  price,
  sum_assured_value,
  is_selected,
  onSelect,
  onRemove
}) => {
  return (
    <Container isSelected={is_selected} onClick={onSelect}>
      <Header>
        <Badge type={badge.type}>{badge.text}</Badge>
        <Heading>{heading}</Heading>
      </Header>

      <Content>
        <Image src={coverImage.imgSrc} alt={coverImage.alt} />
        <Details>
          <Price>₹{price.gross_premium}</Price>
          <GST>Incl. GST ₹{price.gst.gst}</GST>
          <SumAssured>
            Sum Assured: ₹{sum_assured_value.toLocaleString()}
          </SumAssured>
        </Details>
      </Content>

      <Actions>
        {is_selected ? (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            {removeCtaText}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {primaryCtaText}
          </Button>
        )}
      </Actions>
    </Container>
  );
};

export default RSATPAccessory;
