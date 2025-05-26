import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@acko-tech/building-blocks.ui.common";
import DOMPurify from "isomorphic-dompurify";
import { Context } from "@components/useContext/context";
import { resolvePath } from "@utils/resolvePath";
import { LottieConstants, TextMapping } from "./animations";
import { DONT_SHOW_CUSTOM_TEXT } from "@utils/index";
import { updateLottieAnimationLoopCompleted } from "@store/slices/config";

import {
  allLottieAnimationComplete,
  skipLottieAnimation,
  updateLottieAnimationLoopCompletedd,
  updateNextLottieAnimationKey
} from "@store/slices/lottieState";
import { store } from "@store/store";

const Lottie = dynamic(() => import("lottie-react"), { ssr: true });

export const Wrapper = styled.div`
  background-image: url(${resolvePath("/images/headerGradient.svg")});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 160px;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 1000;
  ${(props: { isAddonGradient: any }) =>
    props.isAddonGradient
      ? `
      background-image: url(${resolvePath("/images/addon-header-gradient.svg")});
    `
      : `background-image: url(${resolvePath("/images/headerGradient.svg")});`}
`;

const ParentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: ${(props) => (props.isDesktop ? "0" : "-5%")};
  left: 0;
  flex-direction: column;
  background-color: ${(props) => (props.isDesktop ? "#040222cc" : "#fff")};
  z-index: 100;
  padding-bottom: ${(props) => (props.isDesktop ? "0" : "5vh")};
`;

const CustomText = styled.div`
  color: #451999;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.1px;
  @media (max-width: 768px) {
    line-height: 24px;
  }
`;

const LottieWrapper = styled.div`
  display: flex;
  width: 480px;
  padding: ${(props) => (props.isPlansPageLottie ? "70px 70px" : "108px 80px")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #fff;
  z-index: 2;
  @media (max-width: 768px) {
    width: 90%;
    padding: 40px 20px;
  }
`;

const DynamicLottie = (props) => {
  const { isDesktop } = useContext(Context);
  const dispatch = useDispatch();
  const { styles, isBackClicked, animationKey, showLottieAn } = props || {};
  console.log("setting state", showLottieAn);
  const [showPlansNextAnim, setShowPlansNextAnim] = useState<boolean>(false);
  const [lottieShowCondition, setLottieShowCondition] =
    useState<boolean>(false);
  const [isSecondaryAnimation, setIsSecondaryAnimation] =
    useState<boolean>(false);
  const MAX_ITER = 15;
  const CHECK_INTERVAL = 200;
  // const [animationData, setAnimationData] = useState<any>();
  const {
    // configAnimationKey,
    showLottie,
    currentNode,
    // customAnimationText,
    // lottieAnimationLoopCompleted,
    isLoading,
    isSuccess,
    showLottieFromLottie,
    lottieAnimationKeyfromLottie,
    customAnimationTextFromLottie,
    lottieAnimationLoopCompletedFromLottie,
    nextLottieAnimationKey,
    isNextAnimation,
    showInitialLottieFull,
    nextNodeSuccess,
    nextCustomAnimationText,
    streo,
    redirectionDone
  } = useSelector(({ configuration, lottieState }: any) => {
    return {
      currentNode: configuration?.config?.current_node,
      configAnimationKey: configuration?.lottieAnimationKey,
      isLoading: configuration?.isLoading,
      showLottie: configuration?.showLottie,
      isSuccess: configuration?.isSuccess,
      customAnimationText: configuration?.customAnimationText,
      lottieAnimationLoopCompleted: configuration?.lottieAnimationLoopCompleted,
      showLottieFromLottie: lottieState.showLottie,
      lottieAnimationKeyfromLottie: lottieState?.lottieAnimationKey,
      customAnimationTextFromLottie: lottieState.customAnimationText,
      lottieAnimationLoopCompletedFromLottie:
        lottieState.lottieAnimationLoopCompleted,
      nextLottieAnimationKey: lottieState.nextLottieAnimationKey,
      isNextAnimation: lottieState.isNextAnimation,
      showInitialLottieFull: lottieState.showInitialLottieFull,
      nextCustomAnimationText: lottieState.nextCustomAnimationText,
      nextNodeSuccess: lottieState.nextNodeSuccess,
      streo: lottieState,
      redirectionDone: lottieState.redirectionDone
    };
  });

  const [isLottieCycleCompleted, setIsLottieCycleCompleted] = useState<boolean>(
    lottieAnimationLoopCompletedFromLottie
  );

  const isPlansPageLottie =
    "PLANS_LOADER" === animationKey ||
    // configAnimationKey === "PLANS_LOADER" ||
    lottieAnimationKeyfromLottie === "PLANS_LOADER";

  const isWeFoundYourCarLottie =
    lottieAnimationKeyfromLottie === "WE_FOUND_YOUR_CAR" ||
    animationKey === "WE_FOUND_YOUR_CAR";

  const [showLottieAnim, setShowLottieAnim] = useState<boolean>(showLottieAn);

  const handleLottieCycleCompleteORIG = (e) => {
    console.log("handleLottieCycleComplete", {
      currentNode,
      showLottieFromLottie,
      isLottieCycleCompleted,
      isPlansPageLottie,
      isLoading
    });
    setIsLottieCycleCompleted(true);
    dispatch(
      updateLottieAnimationLoopCompleted({
        lottieAnimationLoopCompleted: true
      })
    );
    if (isPlansPageLottie) {
      setShowPlansNextAnim(true);
      let currIteration = 0;
      const intervalId = setInterval(() => {
        if (!isLoading) {
          setShowPlansNextAnim(true);
          setTimeout(() => {
            setShowPlansNextAnim(false);
            setShowLottieAnim(false);
            dispatch(
              updateLottieAnimationLoopCompleted({
                lottieAnimationLoopCompleted: true
              })
            );
          }, 1500);
          clearInterval(intervalId);
          return;
        }
        ++currIteration;
        if (currIteration >= MAX_ITER) {
          clearInterval(intervalId);
        }
      }, CHECK_INTERVAL);

      return;
    }
    dispatch(
      updateLottieAnimationLoopCompleted({
        lottieAnimationLoopCompleted: true
      })
    );
  };

  // WARNING: READ LINE 1
  const handleLottieCycleComplete = (e) => {
    setIsLottieCycleCompleted(true);

    console.log("amidumb", { isSuccess, isLoading, nextNodeSuccess });
    // if next animation to show and we currently are shwoing previous animation
    if (nextLottieAnimationKey && !isNextAnimation) {
      setIsSecondaryAnimation(true);
      //if we want to show the initial lottie animation until API is resolved
      if (showInitialLottieFull && nextNodeSuccess) {
        dispatch(
          updateNextLottieAnimationKey({
            lottieAnimationKey: nextLottieAnimationKey,
            customAnimationText: nextCustomAnimationText || ""
          })
        );
      }
      // no need to wait for api resolve, just switch the next animation
      else if (!showInitialLottieFull) {
        dispatch(
          updateNextLottieAnimationKey({
            lottieAnimationKey: nextLottieAnimationKey,
            customAnimationText: nextCustomAnimationText || ""
          })
        );
      }
    } else if (nextNodeSuccess) {
      dispatch(
        updateLottieAnimationLoopCompletedd({
          lottieAnimationLoopCompleted: true
        })
      );
      // showlottie false
      if (redirectionDone) {
        dispatch(skipLottieAnimation({ showLottie: false }));
      }
      // else {
      //   dispatch(allLottieAnimationComplete({}));
      // }
    }
  };

  const animationData =
    LottieConstants[
    animationKey || lottieAnimationKeyfromLottie || "LOADER_ANIMATION"
    ];

  useEffect(() => {
    setIsLottieCycleCompleted(lottieAnimationLoopCompletedFromLottie);
  }, [lottieAnimationLoopCompletedFromLottie]);

  useEffect(() => {
    // if (!showLottie) {
    //   setLottieShowCondition(false);
    //   return;
    // }
    // if (!showLottieFromLottie && redirectionDone) {
    if (!showLottieFromLottie) {
      setLottieShowCondition(false);
    } else {
      setLottieShowCondition(true);
    }
  }, [nextNodeSuccess, showLottieFromLottie, showLottie, redirectionDone]);

  const customText =
    customAnimationTextFromLottie === DONT_SHOW_CUSTOM_TEXT
      ? ""
      : TextMapping[currentNode];

  // if ((!showLottie || !animationData || !currentNode) && showLottieFromLottie) {
  //   return null;
  // }

  const lottieStyles = {
    width: "160px",
    height: "160px"
  };

  const plansLottieStyles = {
    width: "300px",
    height: "300px"
  };

  const weFoundCarStyles = {
    width: "240px",
    height: "220px"
  };

  const handleLottieOnComplete = (e) => {
    if (nextNodeSuccess) {
      dispatch(
        updateLottieAnimationLoopCompletedd({
          lottieAnimationLoopCompleted: true
        })
      );
      // showlottie false
      if (redirectionDone) {
        dispatch(skipLottieAnimation({ showLottie: false }));
      }
    }
  };

  let stylesToApply;
  if (
    isPlansPageLottie ||
    animationKey === "TICK_ANIMATION" ||
    lottieAnimationKeyfromLottie === "TICK_ANIMATION"
  ) {
    stylesToApply = plansLottieStyles;
  } else if (isWeFoundYourCarLottie) {
    stylesToApply = weFoundCarStyles;
  } else {
    stylesToApply = lottieStyles;
  }

  return (
    <>
      {" "}
      {lottieShowCondition ? (
        //  showLottieAnim ||
        // !isLottieCycleCompleted ||
        // isLoading
        <>
          {!isDesktop && <Wrapper />}
          <ParentWrapper isDesktop={isDesktop}>
            <LottieWrapper
              isDesktop={isDesktop}
              isPlansPageLottie={isPlansPageLottie}
            >
              <Lottie
                animationData={animationData}
                loop={
                  isNextAnimation ||
                    lottieAnimationKeyfromLottie === "WE_FOUND_YOUR_CAR"
                    ? 0
                    : true
                }
                style={stylesToApply}
                autoplay={true}
                onLoopComplete={handleLottieCycleComplete}
                onComplete={handleLottieOnComplete}
              />
              {/* hiding custom text when back btn clicked  */}
              {!isBackClicked && (
                <CustomText
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      customAnimationTextFromLottie || customText
                    )
                  }}
                />
              )}
            </LottieWrapper>
          </ParentWrapper>
        </>
      ) : null}
    </>
  );
};

export default DynamicLottie;
