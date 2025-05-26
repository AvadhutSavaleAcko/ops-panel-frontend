import growthbook from "./growthbook";
import { useRunOnceHook } from "@components/common/custom-hooks";
import { analyticEvents as triggerAnalyticEvent } from "@actions/analyticEvents";

const useGetFeatureFlag = ({ flagName, fireEvent = true }) => {
  let flagValue;
  flagValue = growthbook?.isOn(flagName);

  useRunOnceHook({
    hookCondition: fireEvent,
    callback: () => {
      triggerAnalyticEvent({
        edata: {
          product: "car",
          experiment_name: flagName,
          variant_name: `${flagValue}`
        },
        odata: {
          journey: "fresh_car"
        },
        event_name: "feature"
      });
    }
  });

  return flagValue;
};

export default useGetFeatureFlag;
