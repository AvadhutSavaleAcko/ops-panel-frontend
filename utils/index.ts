import { analyticEvents as triggerAnalyticEvent } from "@actions/analyticEvents";
import { updateNormalisedConfig } from "@store/slices/config";
import { store } from "@store/store";
import getParameterByName from "./queryParams";

export const currentYear = new Date().getFullYear();
export const registrationMaskedValue = currentYear - 16;

export const formatDate = (date: string) => {
  console.log(date);
  return new Date().toLocaleString();
};

export const getWidgetSpecificIsVisible = (
  normalisedConfig: any,
  id: string
): boolean => {
  const { props } = normalisedConfig[id] || {};
  return props?.is_visible;
};

export const getWidgetSpecificProp = (
  normalisedConfig: any,
  id: string,
  propKey: string
): any => {
  const { props } = normalisedConfig[id] || {};
  return props?.[propKey];
};

export const getWidgetSpecificProps = (
  normalisedConfig: any,
  id: string
): any => {
  const { props } = normalisedConfig[id] || {};
  return props;
};

export const getErrorMessageForId = (normalisedConfig: any, id: string) => {
  const { props } = normalisedConfig?.[id] || {};
  return props?.error_message;
};

export function capitalizeFirstLetter(string: string): string {
  if (typeof string !== "string" || string?.length === 0) {
    return "";
  }
  if (string === "cng") return string?.toLocaleUpperCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const updateStateBasedOnFieldChange = (parentId: string) => {
  const { configuration } = store.getState() || {};
  const { normalisedConfig } = configuration || {};
  const updatedNormalisedConfig = JSON.parse(JSON.stringify(normalisedConfig));
  const data = updatedNormalisedConfig[parentId];

  data.props.error_message = "";
  store.dispatch(
    updateNormalisedConfig({
      normalisedConfig: updatedNormalisedConfig
    })
  );
};

export const transformMakeData = (
  obj: Record<string, string>
): { name: string; link: string }[] => {
  return Object.entries(obj).map(([name, link]) => ({ name, link }));
};

export function getValueFromObject(sharedObj: any, payload: any) {
  if (!payload || !sharedObj) return;
  const key = payload?.name;
  return sharedObj?.[key] || null;
}

// marking this as const so that its readonly and cannot be changed
export const monthMap = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
} as const;

export const monthToNumber = (month: keyof typeof monthMap): number | null => {
  return monthMap[month] || null;
};

export const numberToMonth = (number) => {
  return (
    Object.entries(monthMap).find(([_, num]) => num === number)?.[0] || null
  );
};

export const transformYearOptions = (data: string[]) => {
  return data.map((year, index) => {
    const yearValue = parseInt(year, 10);
    if (isNaN(yearValue)) {
      return {
        name: year,
        value: "0",
        is_registration_year_masked: true,
        maskedValue: Number(data?.[index - 1]) - 1 || registrationMaskedValue,
        className: "registrationYear"
      };
    } else {
      return {
        name: yearValue,
        value: yearValue,
        className: "registrationYear"
      };
    }
  });
};

export enum ADDONS_CAR {
  PA_COVER = "pa_owner_car",
  RSA_OUTSTATION = "rsa_outstation_keyprotect_combo_car"
}

export const getAddonDescription = (description) => {
  let finalDesc = description
    ?.replace(/{bold}/g, "<b>")
    .replace(
      /{ulist}/g,
      `<ul style="list-style-type: disc; list-style-position: inside;">`
    )
    .replace(/{litem}/g, `<li><span style="position: relative; left: -6px;" >`)
    .replace(/\n/g, "<br/>")
    .replace(/{\/bold}/g, "</b>")
    .replace(/{\/litem}/g, `</span></li>`)
    .replace(/{\/ulist}/g, "</ul>");
  return finalDesc;
};

export const ROUND_TO_1_DECIMAL = "roundto1decimal";

export const IdvOPTIONS = { min: "minimum", max: "maximum", custom: "custom" };

export const IS_INFO_TEXT = "infotext";

export const ADDONS_CONTAINER = "ADDONS";

export const CONSUMABLES = "consumables";

export const MINIFIED_DETAILS = "minifiedDetails";

export const PREMIUM_DETAILS = "premium-details";

export const EXPIRED_POLICY_STATUS_90_DAYS = "90-";

export const EDIT_MMV_DETAILS_NODE = "edit_mmv_details_node";

export const ENTER_MMV_DETAILS_NODE = "enter_mmv_details_node";

export const scrollIntoViewWrapper = (elementId, blockType = "center") => {
  const target = document?.getElementById(elementId);
  if (!target) return;
  target?.scrollIntoView({
    behavior: "smooth",
    //@ts-ignore
    block: blockType,
    inline: "center"
  });
};

export const getDataFromStore = (key: string) => {
  try {
    return store?.getState()?.globalState?.payloadData?.[key];
  } catch (err) {
    console.log("Error in accessing store ", err);
  }
};
export const getNcb = (ncb) => {
  let displayValue;
  let value;

  ncb = ncb?.toString();

  if (ncb?.includes("%")) {
    displayValue = ncb;
    value = parseInt(ncb?.split("%")[0]);
  } else {
    displayValue = ncb + "%";
    value = parseInt(ncb);
  }

  return {
    displayValue,
    value
  };
};

/** 
 * Function to send the segment event for client side specific events
@param actName: action (view || action)
@param actType: actionType (tapBtn || view_**)
@param ename: Event Name 
*/
// TODO: FORMAT THIS FXN  to meaningful name and usage
export const sampleAnalytics = (actName, actType, eName, restArgs = {}) => {
  if (!actName || !actType || !eName) return;
  let edata;
  if (actName === "view") {
    edata = {
      view_name: eName,
      view_type: actType,
      ...restArgs
    };
  } else {
    edata = {
      action_name: eName,
      action_type: actType,
      ...restArgs
    };
  }
  if (typeof triggerAnalyticEvent === "function") {
    triggerAnalyticEvent({
      edata,
      odata: {
        journey: "fresh_car"
      },
      event_name: actName
    });
  }
};

export const desktopRightContainerWidth = "550px";

export const DONT_SHOW_CUSTOM_TEXT = "DONT_SHOW_CUSTOM_TEXT";

export const REVIEW_EDIT_NODE = "review_edit_node";

export const StringToNumberPrice = (priceInString) => {
  return Number(priceInString?.replace(/,/g, ""));
};

export const checkIfErrorNode = (data) => {
  if (!data) return false;
  return data?.current_node === "error_node";
};

export const capitalizeDisplayName = (displayName) => {
  if (typeof displayName !== "string") {
    return displayName;
  }

  return displayName
    .split(" ")
    .map((word) =>
      word ? word?.charAt(0)?.toUpperCase() + word?.slice(1) : ""
    )
    .join(" ");
};
export const checkIsPartnerFlow = () => {
  return getParameterByName("utm_source") == "partnership";
};

export const compressPlanName = (plan: any) => {
  let planName = plan;

  if (planName) {
    planName = planName?.replace(/comprehensive/g, "c");
    planName = planName?.replace(/zero_dep/g, "zd");
    planName = planName?.replace(/deductible/g, "d");
  }

  return planName;
};
