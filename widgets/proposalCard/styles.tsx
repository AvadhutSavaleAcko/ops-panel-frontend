import { styled } from "@acko-tech/building-blocks.ui.common";

export const Container = styled.div`
  padding: 1.25rem;
  border-radius: 12px;
  background: white;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const EmptyStateContainer = styled(Container)`
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(to bottom right, #ffffff, #f9fafb);
`;

export const Title = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
`;

export const Description = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin: 0.75rem 0 0;
  line-height: 1.6;
`;

export const BoxContainer = styled.div`
  padding: 1.25rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin: 0 auto 1.5rem;
  max-width: 1200px;
  width: calc(100% - 40px);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: calc(100% - 20px);
    padding: 1rem;
  }
`;

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8fafc;
    transform: translateX(4px);
  }

  @media (max-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr;
    padding: 1rem 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const ProposalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

export const ProposalId = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.025em;
`;

export const ProductLabel = styled.span`
  font-size: 0.9375rem;
  color: #4b5563;
  text-transform: capitalize;
  font-weight: 500;
  letter-spacing: -0.025em;
`;

export const DateInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.25rem;
  font-size: 0.9375rem;
  color: #6b7280;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

export const DateLabel = styled.span`
  display: block;
  font-size: 0.8125rem;
  color: #6b7280;
  margin-bottom: 0.375rem;
  font-weight: 500;
`;

export const DateValue = styled.span`
  color: #374151;
  font-weight: 600;
  font-size: 0.9375rem;
`;

export const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: capitalize;
  max-width: fit-content;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;

  ${({ status }) => {
    switch (status.toLowerCase()) {
      case "draft":
        return `
          background-color: #f3f4f6;
          color: #4b5563;
          border: 1px solid #e5e7eb;
        `;
      case "pending":
        return `
          background-color: #fff7ed;
          color: #9a3412;
          border: 1px solid #fed7aa;
        `;
      case "initialised":
        return `
          background-color: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        `;
      case "rejected":
        return `
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        `;
      default:
        return `
          background-color: #f9fafb;
          color: #374151;
          border: 1px solid #e5e7eb;
        `;
    }
  }}

  &:hover {
    transform: scale(1.05);
  }
`;
