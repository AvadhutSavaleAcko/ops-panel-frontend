import getParameterByName from "@utils/queryParams";
import Cookies from "js-cookie";

export const analyticsMapping = {
  // direct mapping to payload data
  phone: "phone",
  is_external_cng_kit: "external_cng_kit",
  registration_number: "registration_number",
  make: "make_name",
  pincode: "user_pincode_journey",
  model: "model_name",
  variant: "variant_id",
  variant_name: "variant_name",
  make_id: "make_id",
  model_id: "model_id",
  cc: "engine_cc",
  fuel_type: "fuel_type",
  registration_year: "registration_year",
  registration_month: "registration_month",
  is_commercial: "is_commercial",
  chassis_number: "chassis_number",
  engine_number: "engine_number",
  rto_zone: "rto_zone",
  previous_policy_expired: "is_expired",
  previous_policy_type: "previous_policy_type",
  policy_status: "previous_policy_expiry_bucket",
  previous_insurer_name: "previous_insurer",
  previous_policy_expiry_date: "previous_policy_expiry_date",
  previous_od_expiry_date: "previous_od_expiry_date",
  previous_tp_expiry_date: "previous_tp_expiry_date",
  previous_ncb: "previous_ncb",
  previous_idv: "previous_idv",
  previous_policy_claim_answer: "last_year_claim_flag",
  logged_in: "logged_in",
  proposal_id: "proposal_id",
  lastClaimYear: "last_claim_year",
  plans_offered: "plans_offered",
  add_ons_offered: "add_ons_offered",
  add_on_offered_count: "add_on_offered_count",
  plan_id: "plan_selected",
  recommended_idv: "recommended_idv",
  min_idv: "min_idv",
  max_idv: "max_idv",
  idv: "idv_selected",
  is_inspection_reqd: "is_inspection_reqd",
  ncb: "current_ncb",
  discounts_offered: "discounts_offered",
  discounts_applied: "discounts_applied",
  total_discount_amount_applied: "total_discount_amount_applied",
  max_discount_amount_eligible: "max_discount_amount_eligible",
  discount_applied: "discount_applied",
  discount_amount: "discount_amount",
  full_name: "user_name",
  email_id: "email",
  pan_number: "pan_number",
  plan_recommended: "plan_recommended",
  plan_type_selected: "plan_type_selected",
  add_ons_selected_count: "add_ons_selected_count",
  gross_coverage_premium: "gross_coverage_premium",
  net_coverage_premium: "net_coverage_premium",
  add_on_name: "add_on_name",
  tenure: "tenure",
  selected_addons: "add_ons_selected",
  //calculating all the autofilled cases
  is_make_autofilled: "is_make_autofilled",
  is_model_autofilled: "is_model_autofilled",
  is_variant_autofilled: "is_variant_autofilled",
  is_engine_number_autofilled: "is_engine_number_autofilled",
  is_chassis_number_autofilled: "is_chassis_number_autofilled",
  is_registration_date_autofilled: "is_registration_date_autofilled",
  is_previous_policy_type_autofilled: "is_previous_policy_type_autofilled",
  is_previous_policy_expiry_date_autofilled:
    "is_previous_policy_expiry_date_autofilled",
  is_previous_insurer_autofilled: "is_previous_insurer_autofilled",
  is_previous_idv_autofilled: "is_previous_idv_autofilled",
  is_previous_ncb_autofilled: "is_previous_ncb_autofilled",
  is_last_year_claim_flag_autofilled: "is_last_year_claim_flag_autofilled",
  is_last_claim_year_autofilled: "is_last_claim_year_autofilled",
  is_phone_number_autofilled: "is_phone_number_autofilled",
  is_pincode_autofilled: "is_pincode_autofilled",
  is_rc_name_autofilled: "is_rc_name_autofilled",

  view_type: "view_type",
  view_name: "view_name",
  action_type: "action_type",
  action_name: "action_name",
  journey: "journey_name",
  current_node: "page_name",
  modal_name: "modal_name",
  journey_version: "journey_version"
};

export const getUtmParams = () => {
  return {
    utm_source: getParameterByName("utm_source"),
    utm_content: getParameterByName("utm_content"),
    utm_campaign: getParameterByName("utm_campaign"),
    utm_medium: getParameterByName("utm_medium"),
    utm_term: getParameterByName("utm_term")
  };
};

export const sanitizeProperties = (data) => {
  const invalidValues = ["", null, undefined, NaN];
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (!invalidValues.includes(data[key])) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const getAnonymousId = () => {
  let anonymousId = "";
  const aidFormCookie = Cookies.get("we_aid");
  if (aidFormCookie) {
    anonymousId = aidFormCookie;
  } else if (
    window?.webengage &&
    window?.webengage?.user &&
    typeof window?.webengage?.user?.getAnonymousId === "function"
  ) {
    if (window.webengage.user.getAnonymousId()) {
      const aid = window.webengage.user.getAnonymousId();
      Cookies.set("we_aid", aid);
      anonymousId = aid;
    }
  }
  return anonymousId;
};

export const getPlatform = (mweb) => {
  if (Cookies.get("webview")) {
    return Cookies.get("webview") === "android_app" ? "android" : "ios";
  }
  return mweb ? "mweb" : "web";
};
export default {};
