import { useSelector } from "react-redux";
import { isEmpty } from "./lodash";
import { useEffect } from "react";

export const useOnload = ({ id, on_load }) => {
  const { isLoaded } = useSelector(({ configuration }: any) => {
    return {
      isLoaded: !isEmpty(configuration.normalisedConfig[id])
    };
  });

  useEffect(() => {
    if (isLoaded && on_load?.length > 0) {
      on_load?.forEach((eachFunc: any) => {
        typeof eachFunc.funCall === "function" &&
          eachFunc.funCall(eachFunc.args);
      });
    }
  }, [isLoaded, on_load]);
};
