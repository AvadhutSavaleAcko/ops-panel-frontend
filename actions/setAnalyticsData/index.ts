import { store } from "@store/store";
import { setAnalyticsData } from "@store/slices/analyticsState";

export const setAnalytics = (payload) => {
  store?.dispatch(setAnalyticsData(payload));
};
