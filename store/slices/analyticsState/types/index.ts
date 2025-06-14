export interface InsuranceDetails {
  tracker_id: string | null;
  user_id: string | null;
  is_user_logged_in: boolean | null;
  user_name: string | null;
  user_phone_number_login: string | null;
  user_phone_number_journey: string | null;
  user_pincode_journey: string | null;
  user_email_journey: string | null;
  registration_number: string | null;
  rto_zone: string | null;
  make_name: string | null;
  model_name: string | null;
  variant_name: string | null;
  make_id: number | null;
  model_id: number | null;
  variant_id: number | null;
  registration_date: Date | null;
  registration_month: number | null;
  registration_year: number | null;
  fuel_type: string | null;
  engine_cc: number | null;
  chassis_number: string | null;
  engine_number: string | null;
  external_cng_kit: boolean | null;
  is_commercial: boolean | null;
  previous_policy_type: string | null;
  previous_policy_expiry_date: Date | null;
  previous_policy_expiry_bucket: string | null;
  previous_insurer: string | null;
  previous_od_expiry_date: Date | null;
  previous_tp_expiry_date: Date | null;
  previous_idv: number | null;
  previous_ncb: number | null;
  last_year_claim_flag: boolean | null;
  current_ncb: number | null;
  url: string | null;
  landing_url: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  platform: string | null;
  user_agent: string | null;
  plans_offered: string[] | null;
  add_ons_offered: string[] | null;
  add_on_offered_count: number | null;
  recommended_idv: number | null;
  min_idv: number | null;
  max_idv: number | null;
  is_inspection_reqd: boolean | null;
  discounts_offered: string[] | null;
  discounts_applied: string[] | null;
  total_discount_amount_applied: number | null;
  max_discount_amount_eligible: number | null;
  discount_applied: boolean | null;
  discount_amount: number | null;
  plan_selected: string | null;
  idv_selected: number | null;
  add_ons_selected: string[] | null;
  add_ons_selected_count: number | null;
  gross_coverage_premium: number | null;
  net_coverage_premium: number | null;
  is_make_autofilled: boolean | null;
  is_model_autofilled: boolean | null;
  is_variant_autofilled: boolean | null;
  is_engine_number_autofilled: boolean | null;
  is_chassis_number_autofilled: boolean | null;
  is_registration_date_autofilled: boolean | null;
  is_previous_policy_type_autofilled: boolean | null;
  is_previous_policy_expiry_date_autofilled: boolean | null;
  is_previous_insurer_autofilled: boolean | null;
  is_previous_idv_autofilled: boolean | null;
  is_previous_ncb_autofilled: boolean | null;
  is_last_year_claim_flag_autofilled: boolean | null;
  is_last_claim_year_autofilled: boolean | null;
  is_phone_number_autofilled: boolean | null;
  is_pincode_autofilled: boolean | null;
  is_rc_name_autofilled: boolean | null;
  view_type: string | null;
  view_name: string | null;
  action_type: string | null;
  action_name: string | null;
  journey_name: string | null;
}
