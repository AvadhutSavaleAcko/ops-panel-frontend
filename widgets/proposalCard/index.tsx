import React from "react";
import {
  BoxContainer,
  RowContainer,
  ProposalInfo,
  ProductInfo,
  ProposalId,
  ProductLabel,
  DateInfo,
  DateLabel,
  DateValue,
  StatusBadge
} from "./styles";

const formatUnixTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
};

interface ProposalContainerProps {
  children: React.ReactNode;
  is_visible?: boolean;
  className?: string;
}

export const ProposalContainer: React.FC<ProposalContainerProps> = ({
  children,
  is_visible = true,
  className = ""
}) => {
  if (!is_visible) return null;
  return <BoxContainer className={className}>{children}</BoxContainer>;
};

interface ProposalRowProps {
  proposal_id: string;
  proposal_status: string;
  product: string;
  created_on: number;
  updated_on: number;
  is_visible?: boolean;
}

export const ProposalRow: React.FC<ProposalRowProps> = ({
  proposal_id,
  proposal_status,
  product,
  created_on,
  updated_on,
  is_visible = true
}) => {
  if (!is_visible) return null;

  return (
    <RowContainer>
      <ProposalInfo>
        <ProposalId>ID: {proposal_id}</ProposalId>
      </ProposalInfo>

      <ProductInfo>
        <ProductLabel>{product}</ProductLabel>
      </ProductInfo>

      <StatusBadge status={proposal_status}>{proposal_status}</StatusBadge>

      <DateInfo>
        <div>
          <DateLabel>Created On</DateLabel>
          <DateValue>{formatUnixTimestamp(created_on)}</DateValue>
        </div>
        <div>
          <DateLabel>Updated On</DateLabel>
          <DateValue>{formatUnixTimestamp(updated_on)}</DateValue>
        </div>
      </DateInfo>
    </RowContainer>
  );
};
