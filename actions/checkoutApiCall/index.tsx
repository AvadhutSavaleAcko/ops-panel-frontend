import {
  skipLottieAnimation,
  updateLottieAnimationKey,
  updateRedirectionDone
} from "@store/slices/lottieState";
import { store } from "@store/store";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect } from "react";

// setting api here
const checkoutApi = async ({ proposalEkey, data }) => {
  const url = `${process.env.SDUI_API_SERVICE}/checkout`;
  const bodyData = {
    proposal_ekey: proposalEkey,
    ...data
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      throw new Error(`Error in checkout API`);
    }

    const result = await response.json();
    console.log("Response:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const checkoutApiCall = async ({ proposal_ekey, data }) => {
  store?.dispatch(
    updateLottieAnimationKey({
      showLottie: true,
      lottieAnimationKey: "LOADER_ANIMATION",
      customAnimationText: "Redirecting to payment gateway...",
      nextNodeSuccess: false
    })
  );
  //calling checkout API
  const response = await checkoutApi({ proposalEkey: proposal_ekey, data });

  // if we get the redirection url changel href
  const { payment_attributes } = response || {};
  const { redirection_url } = payment_attributes || {};
  if (window && redirection_url) {
    if (Cookies.get("webview")){
      setTimeout(() => {
        store?.dispatch(updateRedirectionDone({ redirectionDone: true }));
        store?.dispatch(skipLottieAnimation({ showLottie: false }));
      }, 200)
    }
    window.location.href = redirection_url;
    // store?.dispatch(updateRedirectionDone({ redirectionDone: true }));
    // store?.dispatch(skipLottieAnimation({ showLottie: false }));
  } else {
    // todo: add fallback for failed checkout scneario ?
    return;
  }
};

// since we cannot call hooks inside hooks thus making this as a component
const CheckoutComponent = (props) => {
  const { data } = props || {};
  const { proposal_ekey } = Router.query;
  
  if (proposal_ekey) {
    checkoutApiCall({ proposal_ekey, data });
  }
  //returnign null as we want tlottie to override
  return <></>;
};

export default CheckoutComponent;
