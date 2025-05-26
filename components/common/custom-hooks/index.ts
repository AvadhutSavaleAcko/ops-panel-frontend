import { useEffect, useState } from "react";
/**
 * this hook run only once, which in turn triggers only one r2d2 event
 * it takes the following params
 *
 * @hookCondition: calling component prior condition to run hook
 * @callback: callback function to run only once
 */
export const useRunOnceHook = ({ hookCondition, callback }: any): any => {
  const [isUseEffectHookFired, setIsUseEffectHookFired] = useState(false);

  return useEffect(() => {
    if (hookCondition && !isUseEffectHookFired) {
      callback();
      setIsUseEffectHookFired(true);
    }
  }, [hookCondition]);
};
