import Lottie from "lottie-react";
import { styled } from "@acko-tech/building-blocks.ui.common";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;

  ${(props) =>
    props.isFullScreen &&
    `
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `}

  ${(props) =>
    props.startInitLottieAnimation &&
    `
    animation: lottie-fade 3s ease-out forwards;

    @keyframes lottie-fade {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    73%{
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-40px);
    }
  }
  `}
`;

const LottieWrapper = styled.div`
  width: 150px;
  height: 150px;

  ${(props) =>
    props.isFullScreen &&
    `
    width: 300%;
    height: 300%;

    animation: full-screen-animation-dissapear 4s ease-in forwards;

    @keyframes full-screen-animation-dissapear {
    0% {

    }
    100% {
      display: none;
    }
  }
  `}

  ${(props) =>
    props.startCouponPageTransition &&
    `
    animation: dissapear 2s ease-in forwards;

    @keyframes dissapear {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    25%{
      transform: translateY(40px) scale(1);
    }
    30%{
      opacity: 1;
      transform: translateY(40px) scale(1);
    }
    50%{
      opacity: 1;
      transform: translateY(40px) scale(1);
    }
    70%{
      display: none;
      transform: translateY(40px) scale(0);
    }
    100% {
      display: none;
      transform: translateY(40px) scale(0);
    }
  }
  `}
`;

const Text = styled.p`
  font-size: 18px;
  margin-top: 20px;
  font-weight: 500;
  color: #333;

  ${(props) =>
    props.startCouponPageTransition &&
    `
    animation: hide 0.3s ease-in forwards;

    @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  `}
`;

export default function ChallanFlow(props) {
  const { animationData, onAnimationComplete, startCouponPageTransition } =
    props;

  const { animation, isFullScreen, text, key } = animationData || {};

  const [startTextAnimation, setStartTextAnimation] = useState(false);
  const [startInitLottieAnimation, setStartInitTextAnimation] = useState(false);

  useEffect(() => {
    let timeout: any = null;
    if (key === "lookingChallan") {
      setStartTextAnimation(true);
      setStartInitTextAnimation(true);
      timeout = setTimeout(() => {
        setStartTextAnimation(false);
        setStartInitTextAnimation(false);
      }, 4000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [key]);

  return (
    <Container
      isFullScreen={isFullScreen}
      startInitLottieAnimation={startInitLottieAnimation}
    >
      <LottieWrapper
        isFullScreen={isFullScreen}
        startCouponPageTransition={startCouponPageTransition}
      >
        <Lottie
          animationData={animation}
          loop={true}
          autoplay={true}
          onComplete={onAnimationComplete}
          style={isFullScreen ? { width: "100%", height: "100%" } : {}}
        />
      </LottieWrapper>
      {text && (
        <Text
          startCouponPageTransition={startCouponPageTransition}
          startTextAnimation={startTextAnimation}
        >
          {text}
        </Text>
      )}
    </Container>
  );
}
