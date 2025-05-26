import { analyticEvents } from "@actions/analyticEvents";
import { fetchConfig } from "@service/apiServices";

import {
  fetchConfigStart,
  fetchConfigSuccess,
  fetchConfigFailure,
  updateNormalisedConfig,
  updateLottieAnimationLoopCompleted
} from "@store/slices/config";
import {
  resetState,
  setData,
  setFieldErrorData,
  setToastData
} from "@store/slices/globalState";
import {
  allLottieAnimationComplete,
  skipLottieAnimation,
  updateIsMmvDataFound,
  updateLottieAnimationKey,
  updateNextNodeSuccess,
  updateNextNodeUpcoming,
  updateRedirectionDone
} from "@store/slices/lottieState";
import { updateLottieAnimationLoopCompletedd } from "@store/slices/lottieState";
import { store } from "@store/store";
import {
  checkIfErrorNode,
  ENTER_MMV_DETAILS_NODE,
  REVIEW_EDIT_NODE,
  scrollIntoViewWrapper
} from "@utils/index";
import Router from "next/router";

export const fetchConfigAndRedirect = async ({
  shouldRedirect = false,
  shouldClearStore = false,
  showBasicLoader = true,
  showLottie = false,
  lottieAnimationKey = "",
  nextLottieAnimationKey = "",
  isRouterReplace = false,
  showInitialLottieFull = false,
  nextCustomAnimationText = "",
  hideCommercialField = false,
  ...payload
}) => {
  const {current_node } = Router.query;
  /*
  showCustomBasicLoader: true, for which basic loader is enalbed via config :) ,
  showCustomLottie: false for which lottie is diabled :) 
  */
  const {
    customAnimationText = "",
    showCustomBasicLoader = true,
    showCustomLottie = true
  } = payload;
  if (shouldClearStore) {
    // for handling cases where user goes back to registration_number and starts new journey
    store?.dispatch(resetState());
  }
  const state = store?.getState();

  let requestBody = { ...payload.requestBody };

  const requestPayload = state.globalState.requestPayload;
  const data = state.globalState.payloadData;

  // custom logic for sending to error node (in commercial Cases)
  if (current_node === ENTER_MMV_DETAILS_NODE && data?.is_commercial) {
    requestBody = {
      ...requestBody,
      expected_node: "error_node"
    };
  }

  const payloadData = {
    ...requestPayload,
    ...requestBody,
    ...(!!current_node && { current_node: current_node }),
    data: {
      ...requestPayload.data,
      ...data,
      ...payload.data
    }
  };

  const isEditMadeOnReviewMMV = state?.configuration?.shouldRedirectToPlansNode;
  const prevUrlNode = state?.configuration?.config?.current_node;

  // if (current_node === REVIEW_EDIT_NODE && prevUrlNode) {
  //   const phoneFromSessionStorage = sessionStorage?.getItem(
  //     "review_edit_node_phone_number"
  //   );
  //   const pincodeFromSessionStorage = sessionStorage?.getItem(
  //     "review_edit_node_pincode"
  //   );

  //   let isPhoneChanged = false;
  //   let isPincodeChanged = false;

  //   if (phoneFromSessionStorage && pincodeFromSessionStorage) {
  //     isPhoneChanged = phoneFromSessionStorage !== payloadData?.data?.phone;
  //     isPincodeChanged =
  //       Number(pincodeFromSessionStorage || "0") !== payloadData?.data?.pincode;
  //   }
  //   console.log("state:", state);

  //   // redirect user to plans_node
  //   if (isPhoneChanged || isPincodeChanged || isEditMadeOnReviewMMV) {
  //     console.log("payloadData:", { payloadData, prevUrlNode });
  //     // Keeping this logic on the BFF
  //     // payloadData.expected_node = "plan_selection_node";
  //     payloadData.expected_node = "";
  //   } else {
  //     // remove reg year and month from paylaod to make proposal stay in payment_ready state
  //     const { registration_year, registration_month, ...filteredData } =
  //       payloadData.data;
  //     payloadData.data = filteredData;
  //     console.log("as", payloadData);
  //   }
  // }

  store?.dispatch(
    fetchConfigStart({
      // todo: reformat below condition
      showBasicLoader: showCustomBasicLoader && true,
      showLottie: showCustomLottie && true,
      lottieAnimationKey: lottieAnimationKey || "LOADER_ANIMATION",
      customAnimationText
    })
  );

  store?.dispatch(
    updateLottieAnimationKey({
      showLottie: showCustomLottie && true,
      lottieAnimationKey: lottieAnimationKey || "LOADER_ANIMATION",
      nextLottieAnimationKey: nextLottieAnimationKey || "",
      customAnimationText,
      showInitialLottieFull,
      nextCustomAnimationText: nextCustomAnimationText,
      nextNodeSuccess: false
    })
  );
  console.log("updateNextNodeSuccess");
  store?.dispatch(updateNextNodeSuccess({ nextNodeSuccess: false }));

  if (showCustomBasicLoader) {
    console.log(showCustomLottie);
    store?.dispatch(
      updateLottieAnimationLoopCompleted({
        lottieAnimationLoopCompleted: true
      })
    );
    !showCustomLottie &&
      store?.dispatch(
        updateLottieAnimationLoopCompletedd({
          lottieAnimationLoopCompleted: true
        })
      );
    !showCustomLottie &&
      store?.dispatch(
        skipLottieAnimation({
          showLottie: false
        })
      );
  }

  console.log(store?.getState());

  // const completeHandler = () => {
  //   store?.dispatch(updateRedirectionDone({ redirectionDone: true }));
  //   store?.dispatch(skipLottieAnimation({ showLottie: false }));
  //   if (window?.wisepops) {
  //     window?.wisepops("pageview");
  //   }
  // };
  try {
    const data: any = await fetchConfig(payloadData);
    if (data) {
      store?.dispatch(fetchConfigSuccess(data));

      if (shouldRedirect || current_node !== prevUrlNode) {
        const nextRedirect: any = isRouterReplace ? "replace" : "push";

        Router?.[nextRedirect]({
          pathname: `/${data?.url?.base_path || "dashboard"}`,
          query: {
            current_node: data?.current_node
          }
        });
      }
      store?.dispatch(updateNextNodeSuccess({ nextNodeSuccess: true }));
      store?.dispatch(skipLottieAnimation({ showLottie: false }));
    }
  } catch (error: any) {
    const { response } = error;
    const errorDetails = response?.data?.data?.error_details;
    const { method, message, component } = errorDetails || {};
    if (errorDetails) {
      if (method === "toast") {
        store?.dispatch(
          setToastData({
            toastMessage: "Something went wrong",
            toastMessageType: "error"
          })
        );
      } else if (method === "field_error") {
        store?.dispatch(
          setFieldErrorData({
            message: message,
            componentName: component,
            show: true
          })
        );
      }
    }

    analyticEvents({
      edata: {
        product: "car",
        exception_type: "next_node_api_failure",
        action_type: "api_failed",
        method: method,
        error_message: JSON.stringify(message)
      },
      odata: {
        journey: "fresh_car"
      },
      event_name: "exception"
    });

    store?.dispatch(fetchConfigFailure(error?.message));
    store?.dispatch(allLottieAnimationComplete({}));
    store?.dispatch(
      skipLottieAnimation({
        showLottie: false
      })
    );
  }
};

export const validateAndFetchConfigAndRedirect = async ({
  shouldRedirect = false,
  onlyValidate = false,
  showBasicLoader = true,
  showLottie = false,
  lottieAnimationKey = "",
  showCustomBasicLoader,
  showCustomLottie,
  ...payload
}: any) => {
  let isError = false;
  const { globalState, configuration } = store.getState() || {};
  const { payloadData: globalPayloadData } = globalState || {};
  const { normalisedConfig } = configuration || {};
  const { required_fields } = payload || {};

  const requiredFieldsWidgets = required_fields?.map((fieldId: string) => {
    return normalisedConfig?.[fieldId];
  });

  const updatedNormalisedConfig = JSON.parse(JSON.stringify(normalisedConfig));
  requiredFieldsWidgets?.forEach((fieldToBeValidated: any) => {
    const { id, props } = fieldToBeValidated || {};
    const { payloadData, validate, is_visible } = props || {};
    const { regex, requiredErrorMessage, inValidErrorMessage } = validate || {};
    const { name } = payloadData || {};
    const isKeyPresent = Object.hasOwn(globalPayloadData, name);
    const fieldValue = globalPayloadData?.[name];

    const data = updatedNormalisedConfig[id];
    if (
      (!isKeyPresent || fieldValue === "" || fieldValue === null) &&
      is_visible
    ) {
      isError = true;
      data.props.error_message = requiredErrorMessage;
      scrollIntoViewWrapper(name);
    } else if (
      isKeyPresent &&
      regex &&
      !new RegExp(regex, "i").test(globalPayloadData[name])
    ) {
      isError = true;
      scrollIntoViewWrapper(name);
      return inValidErrorMessage;
    }
  });
  store.dispatch(
    updateNormalisedConfig({
      normalisedConfig: updatedNormalisedConfig
    })
  );

  if (!isError && !onlyValidate) {
    fetchConfigAndRedirect({
      ...payload,
      shouldRedirect,
      showBasicLoader,
      showLottie,
      showCustomBasicLoader,
      showCustomLottie,
      lottieAnimationKey: lottieAnimationKey ?? "LOADER_ANIMATION"
    });
  }
  if (onlyValidate) {
    return isError;
  }
};

export const removeError = (id) => {
  const { configuration } = store.getState() || {};
  const { normalisedConfig } = configuration || {};
  let updatedNormalisedConfig = JSON.parse(JSON.stringify(normalisedConfig));
  let nodeToResetError: any = updatedNormalisedConfig[id];
  delete nodeToResetError.props.error_message;
  updatedNormalisedConfig = { ...updatedNormalisedConfig, nodeToResetError };
  store.dispatch(
    updateNormalisedConfig({
      normalisedConfig: updatedNormalisedConfig
    })
  );
};
