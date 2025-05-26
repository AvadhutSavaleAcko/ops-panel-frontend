const QUERY_PRESERVE_PARAMS = [
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_medium",
  "utm_source",
  "category",
  "fvid",
  "gclid",
  "utm_adgroup",
  "utm_network",
  "utm_matchtype",
  "utm_device",
  "utm_placement",
  "utm_adposition",
  "utm_location",
  "utm_sitelink",
  "utm_audience",
  "utm_promotion",
  "utm_price",
  "source",
  "plan_filter",
  "deny_cc",
  "lpSource",
  "flow",
  "product",
  "old_stack",
  "inspectionJourney",
  "registration_number",
  "lsi_portal_flow"
];

export const QUERY_NOT_REQUIRED_FETCH = [
  "lpSource",
  "inspectionJourney",
  "registration_number"
];

export const getUrlWithUtmParams = ({ url, queryParams }) => {
  const urlParams = new URLSearchParams(window.location.search);

  const apiUrl = new URL(`${process.env.HOST_URL}${url}`);

  Object.keys(queryParams)?.forEach(item => {
    const value = queryParams[item];
    if (value) apiUrl.searchParams.append(item, value);
  });

  QUERY_PRESERVE_PARAMS.forEach(item => {
    if (item === "lpSource") return;
    const value = urlParams.get(item);
    if (value) apiUrl.searchParams.append(item, value);
  });

  return apiUrl?.href;
};

export default QUERY_PRESERVE_PARAMS;
