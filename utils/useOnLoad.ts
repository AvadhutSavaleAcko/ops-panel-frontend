import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { Context } from "@components/useContext/context";

export const useOnload = ({ on_load, is_visible = true }) => {
  const [onLoadFired, setOnLoadFired] = useState(false);
  const { isFlutterInAppWebViewReady } = useContext(Context);

  const { isNormalisedConfigSuccess, isSuccess } = useSelector(
    ({ configuration }: any) => {
      return {
        isNormalisedConfigSuccess: configuration?.normalisedConfigSuccess,
        isSuccess: configuration?.isSuccess
      };
    }
  );

  useEffect(() => {
    if (
      is_visible &&
      on_load?.length > 0 &&
      isNormalisedConfigSuccess &&
      !onLoadFired &&
      isSuccess
    ) {
      on_load?.forEach((eachFunc: any) => {
        typeof eachFunc.funCall === "function" &&
          eachFunc.funCall({ ...eachFunc.args, isFlutterInAppWebViewReady });
      });
      setOnLoadFired(true);
    }
  }, [on_load, is_visible, isNormalisedConfigSuccess, isSuccess]);
};
