import { getFromSessionStorage } from "./getFromSessionStorage";
import { conditionalCall } from "./conditionalCall";
import {
  fetchConfigAndRedirect,
  validateAndFetchConfigAndRedirect
} from "./fetchConfigRedirect";
import { updateVisibility } from "./showHideWidgets";
import { updateMultipleWidgetProps, updatePropsAction } from "./updateProps";
import { setInSessionStorage } from "./setInSessionStorage";
import { handleApplyDiscount } from "./handleApplyDiscount";
import { setPayload } from "./setPayloadData";
import { checkValueAndCall } from "./checkValueAndCall";
import { handleAddonUpdate } from "./handleAddonUpdate";
import { scrollIntoViewWrapper } from "./scrollIntoViewWrapper";
import { validateDataAndFields } from "./fieldValidation";
import { VerifyOtpAndRedirect } from "./verifyAndNextNode";
import { handleRouterBack } from "./handleRouterBack";
import { setRequestPayloadData } from "./setRequestPayload";
import { analyticEvents } from "./analyticEvents";
import { checkGlobalDataAndCall } from "./checkGlobalDataAndCall";
import { dispatchCallEvents } from "./dispatchCallAnalytics";
import { GoToHomePage } from "./goToHomePage";
import { checkMutipleValuesAndCall } from "./checkMutipleValuesAndCall";
import CheckoutComponent from "./checkoutApiCall";
import { resetPayloadData } from "./resetPayloadData";
import { triggerFirebaseEvent } from "./triggerFirebaseEvent";
import { handleReviewAddonUpdate } from "./handleReviewAddonUpdate";
import { 
  handleTabSelection,
  showAddModelForm,
  submitModelForm,
  updateTableData 
} from './dashboardActions';

const actions = {
  submit_call: updateVisibility,
  fetch_config_redirect: fetchConfigAndRedirect,
  validateAndFetchConfigAndRedirect: validateAndFetchConfigAndRedirect,
  // setGlobalData: setGlobalData,
  setPayloadData: setPayload,
  // updateProps: updatePropsAction,
  conditionalCall: conditionalCall,
  getFromSessionStorage: getFromSessionStorage,
  setInSessionStorage: setInSessionStorage,
  handleApplyDiscount: handleApplyDiscount,
  handleAddonUpdate: handleAddonUpdate,
  handleReviewAddonUpdate: handleReviewAddonUpdate,
  updateMultipleWidgetProps: updateMultipleWidgetProps,
  scrollIntoView: scrollIntoViewWrapper,
  validateDataAndFields: validateDataAndFields,
  verify_otp_redirect: VerifyOtpAndRedirect,
  handleRouterBack: handleRouterBack,
  checkValueAndCall: checkValueAndCall,
  setRequestPayload: setRequestPayloadData,
  triggerEvent: analyticEvents,
  checkGlobalDataAndCall: checkGlobalDataAndCall,
  dispatchCallEvents: dispatchCallEvents,
  goToHomePage: GoToHomePage,
  checkMutipleValuesAndCall: checkMutipleValuesAndCall,
  redirect_to_payment_gateway: CheckoutComponent,
  resetPayloadData: resetPayloadData,
  triggerFirebaseEvent: triggerFirebaseEvent,
  handleTabSelection:handleTabSelection,
  showAddModelForm:showAddModelForm,
  submitModelForm:submitModelForm,
  updateTableData:updateTableData,
  // updateProps: updateProps,
};

export default actions;
