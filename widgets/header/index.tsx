import React from "react";
import AckoLogo from "@public/images/acko_new_logo.svg";
import { styled } from "@acko-tech/building-blocks.ui.common";
import CustomDropdown from "@components/customdropdown";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { connect } from "react-redux";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const StyledCustomDropdown = styled(CustomDropdown)`
  width: 120px;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  // position:fixed;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  background: #2c3e50;
  // width: 14.43%;
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 280px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;
const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 10000;
`;
const AdminTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 500;
  margin: 0;
`;

const LogoWrapper = styled.div`
  min-width: 100px;
  max-width: 120px;
  @media (max-width: 768px) {
    max-width: 100px;
  }
`;

interface HeaderProps {
  is_visible?: boolean;
  productOptions?: Array<{
    value: string;
    displayValue: string;
  }>;
  defaultProduct?: {
    value: string;
    displayValue: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  is_visible = true,
  productOptions = [],
  defaultProduct = { value: "auto", displayValue: "Auto" }
}) => {
  if (!is_visible) return null;
  return (
    <HeaderContainer>
      <LeftSection>
        <LogoWrapper>
          <AckoLogo />
        </LogoWrapper>
        <StyledCustomDropdown
          value={defaultProduct}
          options={productOptions}
          label="Select LOB"
          heading="Products"
          payloadData={{
            name: "selected_product",
            value: defaultProduct?.value
          }}
        />
      </LeftSection>
      <RightSection>
        <AdminTitle>
          <span>OP</span>eration<span>S</span> Panel
        </AdminTitle>
      </RightSection>
    </HeaderContainer>
  );
};

export default connect(mapStateToProps)(Header);
