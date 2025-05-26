import actions from "../actionsMap";

interface Case {
  value: string | number | boolean;
  expectedValue: string | number | boolean;
  operator:
    | "equal"
    | "notEqual"
    | "greaterThan"
    | "lessThan"
    | "greaterThanEqual"
    | "lessThanEqual";
}

interface Cases {
  false: Array<any>;
  true: Array<any>;
}
export const checkMutipleValuesAndCall = (props: {
  executables: Cases;
  casesToCheck: Array<Case>;
}) => {
  const { casesToCheck, executables } = props;

  const resultsArray = casesToCheck?.map(
    ({ value, expectedValue, operator }) => {
      let res = false;
      switch (operator) {
        case "equal":
          res = expectedValue === value;
          break;
        case "notEqual":
          res = expectedValue !== value;
          break;
        case "greaterThan":
          res = expectedValue > value;
          break;
        case "lessThan":
          res = expectedValue < value;
          break;
        case "greaterThanEqual":
          res = expectedValue >= value;
          break;
        case "lessThanEqual":
          res = expectedValue >= value;
          break;
      }
      return res;
    }
  );

  const allConditionsFulfilled = !resultsArray.includes(false);

  const caseValue = String(allConditionsFulfilled);

  const functionsToExecute = executables[caseValue];

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
