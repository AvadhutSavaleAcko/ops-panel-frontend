import { isEmpty } from "@utils/lodash";
import actions from "../actionsMap";

interface Cases {
  fallback: Array<any>;
  [key: string]: Array<any>;
}
export const conditionalCall = async (props: {
  base_func: {
    args: any;
    type: "string";
  };
  cases: Cases;
}) => {
  const { base_func } = props;
  const setterFunc = actions[base_func.type];
  const value = await setterFunc(base_func.args);
  const caseValue = String(value);
  const isCasePresent = !isEmpty(props.cases[caseValue]);
  const functionsToExecute = isCasePresent
    ? props.cases[caseValue]
    : props.cases["fallback"];

  if (functionsToExecute?.length === 0) {
    return;
  } else {
    for (let i = 0; i < functionsToExecute?.length; i++) {
      const functionToExecute = actions[functionsToExecute[i]?.type];
      typeof functionToExecute === "function" &&
        functionToExecute(functionsToExecute[i]?.args);
    }
  }
};
