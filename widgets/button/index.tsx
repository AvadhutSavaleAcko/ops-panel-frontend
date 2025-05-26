import React, { useContext } from "react";
import { ConfirmButton, CueText, MainContainer } from "./styles";
import { useRouter } from "next/router";
import { Context } from "@components/useContext/context";
import { connect, useDispatch, useSelector } from "react-redux";
import { getWidgetSpecificProps } from "@utils/index";
import { updateNormalisedConfig } from "@store/slices/config";

const mapStateToProps = function (state: any, ownProps: any) {
  return getWidgetSpecificProps(
    state.configuration?.normalisedConfig,
    ownProps.id
  );
};

const Button = (props: any) => {
  const dispatch = useDispatch();
  const { isDesktop } = useContext(Context);
  const {
    actions,
    cueText,
    label,
    styles,
    children,
    wrapperStyles,
    dWrapperStyles
  } = props;
  const router = useRouter();
  const { proposal_ekey, current_node } = router?.query;

  const { globalPayloadData, normalisedConfig } = useSelector(
    ({ globalState, configuration }: any) => {
      return {
        normalisedConfig: configuration?.normalisedConfig,
        globalPayloadData: globalState?.payloadData
      };
    }
  );
  const { conditional_call, on_click, validate_call_func } = actions || [];

  const handleProceed = async () => {
    // let payload = {
    //   current_node: current_node,
    //   expected_node: "",
    //   journey: "fresh_car",
    //   data: {
    //     proposal_ekey: proposal_ekey,
    //     ...payloadData
    //   },
    //   ...on_click?.[0].args
    // };

    let payload = {
      ...on_click?.[0]?.args,
      requestBody: {
        current_node: current_node,
        expected_node: "",
        journey: "fresh_car",
        ...on_click?.[0]?.args?.requestBody
      },
      data: {
        proposal_ekey: proposal_ekey,
        ...globalPayloadData,
        ...on_click?.[0]?.args?.data
      }
    };

    console.log("heeeeeeeeeeeee", payload);

    if (conditional_call?.length > 0) {
      if (
        conditional_call?.[0] &&
        typeof conditional_call[0].funCall === "function"
      ) {
        conditional_call[0].funCall({
          ...(conditional_call[0].args || {})
        });
      }
    } else if (validate_call_func?.length > 0) {
      if (
        validate_call_func?.[0] &&
        typeof validate_call_func[0].funCall === "function"
      ) {
        const args = validate_call_func[0].args;
        const { required_fields } = args;
        const getData = await validate_call_func[0].funCall({
          requiredFields: required_fields,
          normalisedConfig,
          globalPayloadData
        });

        const { updatedNormalisedConfig, isError } = getData || {};

        dispatch(
          updateNormalisedConfig({
            normalisedConfig: updatedNormalisedConfig
          })
        );

        if (!isError) {
          if (
            validate_call_func?.[2] &&
            typeof validate_call_func[2].funCall === "function"
          ) {
            validate_call_func[2].funCall(validate_call_func[2].args || {});
          }

          if (
            validate_call_func?.[1] &&
            typeof validate_call_func[1].funCall === "function"
          ) {
            payload = {
              ...payload,
              data: {
                ...payload.data,
                phone: validate_call_func[1].args?.phone
              }
            };

            validate_call_func[1].funCall({
              ...payload,
              ...(validate_call_func[1].args || {}),
              shouldRedirect: true
            });
          }
        }
      }
    } else {
      if (on_click?.[0] && typeof on_click[0].funCall === "function") {
        console.log("eachFunc", actions);
        on_click?.forEach((eachFunc: any) => {
          console.log("mkay eachFunc", eachFunc);
          // todo: write in action map
          if (eachFunc?.funCall?.name === "GoToHomePage") {
            window.location.href =
              process.env.HOST_URL || "https://www.ackodev.com/t/car";
          }
          payload = {
            ...payload,
            ...eachFunc.args
          };
          eachFunc.funCall({ shouldRedirect: true, ...payload });
        });
      }
    }
  };

  return (
    <MainContainer
      wrapperStyles={wrapperStyles}
      dWrapperStyles={dWrapperStyles}
    >
      <ConfirmButton
        padding="13px 32px"
        width={isDesktop ? "320px" : "100%"}
        onClick={handleProceed}
        disable
        styles={styles}
      >
      </ConfirmButton>
      {cueText ? <CueText>{cueText}</CueText> : null}
      {children}
    </MainContainer>
  );
};

export default connect(mapStateToProps)(Button);
