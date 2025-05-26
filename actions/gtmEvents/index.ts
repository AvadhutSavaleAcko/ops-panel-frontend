import Cookies from "js-cookie";
import { gtmAPI } from "./api";
import * as GTM from "./gtm";
import { pageView } from "./helper";

export const gtmSaga = async (action) => {
  try {
    const url = window.location.href;
    await pageView(url);
    await gtmAPI({
      ...GTM[action.payload.event],
      ...action.payload.data,
      tracker: Cookies.get("trackerid")
    });
  } catch (e) {
    console.error(e);
  }
};
