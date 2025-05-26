import { isEmpty } from "@utils/lodash";
import actions from "../actionsMap";

interface Cases {
  fallback: Array<any>;
  [key: string]: Array<any>;
}
export const checkValueAndCall = (props: {
  value: string;
  cases: Cases;
  payloadData?: any;
  globalData?: any;
}) => {
  const { value, cases, payloadData, globalData } = props;

  const caseValue = String(value);

  const isCasePresent = !isEmpty(cases[caseValue]);

  const functionsToExecute = isCasePresent
    ? props.cases[caseValue]
    : props.cases["fallback"];

  if (functionsToExecute?.length === 0) {
    return;
  } else {
    for (let i = 0; i < functionsToExecute?.length; i++) {
      const functionToExecute = actions[functionsToExecute[i]?.type];
      typeof functionToExecute === "function" &&
        functionToExecute({
          ...functionsToExecute[i]?.args,
          payloadData,
          globalData
        });
    }
  }
};
