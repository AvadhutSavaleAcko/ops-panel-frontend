import actions from "@actions/actionsMap";
import { store } from "@store/store";
import { isEmpty } from "@utils/lodash";

interface Cases {
  fallback: Array<any>;
  [key: string]: Array<any>;
}

export const checkGlobalDataAndCall = (props: {
  key: string;
  cases: Cases;
}) => {
  const { cases, key } = props;

  const globalData = store?.getState()?.globalState || {};

  const value = globalData[key];

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
          ...functionsToExecute[i]?.args
        });
    }
  }
};
