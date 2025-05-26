//@ts-nocheck
import React, { useEffect, useMemo } from "react";
import DynamicLottie from "@components/common/Lottie/LottieAnimation";
import paymentConfig from "@public/sampleConfig/payment_node.json";
import revieConfig from "@public/sampleConfig/review-config.json";
import localConfig from "@public/sampleConfig/local.json";
import DiscountCnfig from "@public/sampleConfig/discount.json";
import { Renderer } from "@acko-sdui/ui-parser";
import widgetsMap from "@widgets/widgetsMap";
import actionsMap from "@actions/actionsMap";
import { wrapper } from "@store/store";
import { fetchConfig } from "@service/apiServices";
import {
  fetchConfigSuccess,
  fetchConfigFailure,
  fetchNormalisedConfigSuccess,
  updateShowCouponAnimation
} from "@store/slices/config";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import discountConfig from "@public/sampleConfig/discount.json";
import MMVconfig from "@public/sampleConfig/mmv-config.json";
import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";
import { getFromSessionStorage } from "@actions/getFromSessionStorage";
import { isEmpty } from "@utils/lodash";

const useQueryParameters = () => {
  const router = useRouter();
  const { current_node } = router.query;
  return { current_node };
};

const Page = (props: any) => {
  // const { config } = props;
  // console.log({config});
  const dispatch = useDispatch();
  const { current_node } = useQueryParameters();
  console.log("current_node:", current_node);
  const {
    configResponse,
    showLottie,
    isLoading,
    showCouponAnimation,
    isNormalisedConfigSuccess,
    isSuccess,
    showLottieAnim,
    redirectionDone,
    nextNodeSuccess,
    isMmvDataFound,
    allState
  } = useSelector(({ configuration, lottieState }: any) => {
    return {
      configResponse: configuration?.config,
      showLottie: configuration.showLottie,
      isLoading: configuration?.isLoading,
      showCouponAnimation: configuration?.showCouponAnimation,
      isNormalisedConfigSuccess: configuration?.normalisedConfigSuccess,
      isSuccess: configuration?.isSuccess,
      showLottieAnim: lottieState?.showLottie,
      redirectionDone: lottieState?.redirectionDone,
      nextNodeSuccess: lottieState?.nextNodeSuccess,
      isMmvDataFound: lottieState?.isMmvDataFound,
      allState: lottieState
    };
  });

  const configNode = configResponse?.current_node;
  console.log("configNode:", configNode);

  // Client side call
  useEffect(() => {
    if (current_node) {
      const payload = {
        requestBody: {
          current_node: current_node,
          journey: "ops_panel",
          ...(current_node !== "entry_node" && { expected_node: current_node })
        },
        data: {},
        ...(current_node === "entry_node" && {
          isRouterReplace: true,
          shouldRedirect: true
        })
      };
      console.log("payload", payload);
      if (
        !configResponse ||
        Object.keys(configResponse).length === 0 ||
        configNode !== current_node
      ) {
        fetchConfigAndRedirect(payload);
      }
    }
  }, [current_node]);

  const { normalisedData, componentsTree } = useMemo(
    () => Renderer(configResponse, widgetsMap, actionsMap),
    [configResponse]
  );
  console.log("componentsTree", componentsTree);
  console.log("normalisedData", normalisedData);
  useEffect(() => {
    console.log("normalisedData", normalisedData);
    if (!isEmpty(normalisedData)) {
      dispatch(fetchNormalisedConfigSuccess(normalisedData));
    }
  }, [normalisedData]);

  console.log("isSuccess", isSuccess, isNormalisedConfigSuccess);
  useEffect(() => {
    if (isSuccess && isNormalisedConfigSuccess) {
      const { on_load } = configResponse?.actions?.on_load || [];
      if (on_load?.length > 0) {
        on_load?.forEach((eachFunc: any) => {
          typeof eachFunc.funCall === "function" &&
            eachFunc.funCall(eachFunc.args);
        });
      }
    }
  }, [configResponse, isSuccess, isNormalisedConfigSuccess]);

  const showWeFoundYourCarLottieInCngScreen =
    current_node === "cng_confirmation_node" && !isMmvDataFound;

  return (
    <div>
      {(current_node === "entry_node" && !redirectionDone) ||
      (showWeFoundYourCarLottieInCngScreen && showLottieAnim) ? (
        <RegistraionNumberLottie />
      ) : showCouponAnimation &&
        showLottieAnim &&
        configNode === current_node ? (
        <CouponDiscountAnimation
          showAnimation={showCouponAnimation && isLoading}
        />
      ) : (
        configNode === current_node && (
          <DynamicLottie
            showLottieAn={showLottie}
            isBackClicked={configNode !== current_node}
          />
        )
      )}
      {componentsTree()}
    </div>
  );
};

export default Page;
