import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { PrimaryButton } from "@acko-tech/building-blocks.ui.button";
import { Flex } from "@acko-tech/building-blocks.ui.common";
import { Text } from "@acko-tech/building-blocks.ui.typography";
import { styled } from "@acko-tech/building-blocks.ui.common";
import { Context } from "@components/useContext/context";

const ErrorImg = dynamic<any>(() => import("@public/images/icons/error.svg"), {
  ssr: true
});

const OoopsText = styled(Text)`
  color: #040222;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
`;

const SubText = styled(Text)`
  color: #5b5675;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const RegistrationNumber = styled(Text)`
  color: #5920c5;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const StickyFooter = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 12px 20px 20px 20px;
`;

function Error(props) {
  const { registration_number: registrationNumber } = props;
  const { isDesktop } = useContext(Context);
  const redirectionToHome = () => {
    window.location.href =
      process.env.HOST_URL || "https://www.ackodev.com/t/car";
  };

  const formattedRegNumber = registrationNumber?.toUpperCase();
  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        styles={{
          boxSizing: "border-box",
          textAlign: "center",
          position: "absolute",
          padding: "20px",
          top: "50%",
          left: isDesktop ? "12%" : "auto",
          transform: isDesktop
            ? " translateX(50%) translateY(-50%)"
            : "translateY(-50%)",
          maxWidth: "500px",
          gap: "12px"
        }}
      >
        <ErrorImg />
        {formattedRegNumber && (
          <RegistrationNumber>{formattedRegNumber}</RegistrationNumber>
        )}
        <OoopsText>
          Unfortunately, We are unable to cover your vehicle at this time
        </OoopsText>
        <SubText>
          We are working hard to expand our coverage and will let you know when
          we’re ready
        </SubText>
        {isDesktop && (
          <div style={{ width: "80%", marginTop: "2rem" }}>
            <PrimaryButton isFullWidth onClick={redirectionToHome}>
              {" "}
              <div
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "32px"
                }}
              >
                Back to home{" "}
              </div>
            </PrimaryButton>
          </div>
        )}
      </Flex>

      {!isDesktop && (
        <StickyFooter>
          <PrimaryButton onClick={redirectionToHome}>
            Back to home
          </PrimaryButton>
        </StickyFooter>
      )}
    </>
  );
}

export default Error;
