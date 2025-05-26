import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import globalReducer from "@store/slices/globalState";
import configReducer from "@store/slices/config";
import analyticState from "@store/slices/analyticsState";
import lottieReducer from "@store/slices/lottieState";
import dashboardReducer  from "@store/slices/dashboardState";

import dashboard from "@widgets/dashboard";


const rootReducer = (state: any, action: any) => {
  console.log('Setting global data:', action.payload);

  switch (action.type) {
    case HYDRATE:
      return {
        ...state
        // ...action.payload,
      };
    default: {
      const combineReducer = combineReducers({
        globalState: globalReducer,
        configuration: configReducer,
        analytics: analyticState,
        lottieState: lottieReducer,
        dashboardstate: dashboardReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
