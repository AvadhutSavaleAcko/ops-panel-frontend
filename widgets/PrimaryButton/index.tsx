import React, { useContext } from "react";
import { PrimaryButton } from "@acko-tech/building-blocks.ui.button";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Context } from "@components/useContext/context";

const PrimaryButtonContainer = (props: any) => {
  const { isDesktop } = useContext(Context);
  const { actions, cueText, label } = props;
  const router = useRouter();
  const { proposal_ekey, current_node } = router?.query;

  const { payloadData } = useSelector(({ globalState }: any) => {
    return {
      payloadData: globalState?.payloadData
    };
  });

  const { on_click } = actions || [];

  const handleClick = () => {
    let payload = {
      requestBody: {
        current_node: current_node,
        expected_node: "",
        journey: "fresh_car"
      },
      data: {
        proposal_ekey: proposal_ekey,
        ...payloadData
      }
      // ...on_click?.[0].args,
    };

    console.log("payload", payload)

    if (on_click?.[0] && typeof on_click[0].funCall === "function") {
      on_click?.forEach((eachFunc: any) => {
        console.log("eachFunc", eachFunc.args)
        payload = {
          ...payload,
          ...eachFunc.args,
          requestBody: {
            ...payload.requestBody,
            ...eachFunc?.args?.requestBody
          },
          data: { ...payload.data, ...eachFunc?.args?.data }
        };
        eachFunc.funCall({ ...payload, shouldRedirect: true });
      });
    }
  };

  return (
    <PrimaryButton
      isFullWidth={false}
      onClick={() => {
        handleClick();
      }}
    >
    </PrimaryButton>
  );
};

export default PrimaryButtonContainer;
