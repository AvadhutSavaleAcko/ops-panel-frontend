import { analyticEvents } from "@actions/analyticEvents";
import { setAnalytics } from "@actions/setAnalyticsData";
import { store } from "@store/store";

export const dispatchCallEvents = (eventsData) => {
  const state = store?.getState();
  const configuration = state?.configuration?.config;

  const baseUrl = `${window.location.origin}/gi/auto-storefront/${configuration?.url?.base_path || "fresh-car"}`;
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('current_node', configuration?.current_node);
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const urlConstruct = `${baseUrl}${queryParams}`;

  const urlPayload = {
    landing_page: urlConstruct,
    path: urlConstruct,
    url: urlConstruct,
    page: urlConstruct,
    search: queryParams
  }
  


  const payload = {
    ...eventsData.edata,
    ...eventsData.odata,
    ...eventsData.customData,
    ...urlPayload,
    current_node: configuration?.current_node
  };

  setAnalytics(payload);
  analyticEvents(eventsData);
};
