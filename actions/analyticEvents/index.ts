import {
  getUtmParams,
  sanitizeProperties,
  getAnonymousId,
  analyticsMapping,
  getPlatform
} from "./utils";
import Cookies from "js-cookie";
import Router from "next/router";
import { trackAPI, viewAPI } from "@service/segmentService";
import { store } from "@store/store";
import { sendR2D2Api } from "@service/apiServices";

export const analyticEvents = async (eventsData: any) => {
  const {
    event_name,
    okind,
    isViewEvent = false,
    ...restPayload
  } = eventsData || {};
  const eventName = event_name;

  const { proposal_ekey, current_node } = Router.query;
  const state = store?.getState();

  const { view_name } = restPayload.customData || {};

  // always include payload data in sending segment event
  // rather than custom including at each level
  // const payloadData = state?.globalState?.payloadData || {};

  const analyticsData: any = state?.analytics || {};

  const isAndroidApp = Cookies.get("webview") === "android_app";
  const androidData = isAndroidApp
    ? {
      android: true,
      android_app_version: Cookies.get("android_app_version")
    }
    : {};

  const anonymousID = await getAnonymousId();
  const utmParams = getUtmParams();

  // const filteredData = {
  //   ...Object.entries(analyticsMapping).reduce((a, [k, v]) => {
  //     // eslint-disable-next-line no-prototype-builtins
  //     if (analyticsData?.hasOwnProperty(k)) {
  //       return {
  //         ...a,
  //         [v]: analyticsData[k],
  //       };
  //     }
  //     return a;
  //   }, {}),
  // };

  const filteredData = {
    ...Object.entries(analyticsData).reduce((a, [k, v]) => {
      const mappedKey = analyticsMapping[k];

      if (k === "current_node") {
        return {
          ...a,
          ["page_name"]: v,
          ["current_node"]: v
        };
      }

      return {
        ...a,
        [mappedKey || k]: v
      };
    }, {})
  };

  const commonAttributes = {
    journey: "fresh_car",
    platform: getPlatform(!window.isDesktop),
    product: "auto",
    landing_page: window.location.href,
    path: window.location.href,
    current_node: current_node,
    ...utmParams,
    ...androidData,
    ...filteredData,
    ...restPayload.edata,
    ...restPayload.odata,
    ...restPayload.customData,
    proposal_id: proposal_ekey,
    ...(view_name === "view_page_plan_page" ? { publish: true } : {})
  };

  const payload = {
    event_name: eventName,
    customAttributes: {
      ...commonAttributes,
      user_ekey: (Cookies.get("user_id") || "").split(":")[0]
      // ...payloadData,
    }
  };

  const r2d2Payload = {
    ekind: eventName,
    okind: okind || "auto_proposal",
    edata: {
      anonymousID,
      ga_client_id: "1079354792.1580967007",
      is_js: true,
      web_engage: true,
      ...commonAttributes,
      oid: okind === "tracker" ? Cookies.get("trackerid") : proposal_ekey
    },
    odata: {
      product: "car",
      url: window.location.href,
      phone: analyticsData?.phone,
      ...restPayload.odata
    },
    app: "NS_React",
    user: (Cookies.get("user_id") || "").split(":")[0],
    ua: navigator.userAgent,
    tracker: Cookies.get("trackerid")
  };

  const segmentAPI =
    isViewEvent || eventName?.toUpperCase()?.includes("VIEW")
      ? viewAPI
      : trackAPI;

  const shouldClearViewAttrs =
    !isViewEvent && !eventName?.toUpperCase()?.includes("VIEW");

  payload.customAttributes = {
    ...payload.customAttributes,
    ...(shouldClearViewAttrs ? { view_name: "", view_type: "" } : {})
  };

  sendR2D2Api(r2d2Payload);

  segmentAPI({
    ...payload,
    customAttributes: sanitizeProperties(payload.customAttributes)
  });
};
