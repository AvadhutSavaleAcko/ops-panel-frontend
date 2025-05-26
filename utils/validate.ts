export const cleanRegNo = (carNumber: string) => {
  return carNumber?.toUpperCase()?.replace(/[. ,:-]+/g, "");
};

export function validateFunction({
  currentValue,
  regex,
  inValidErrorMessage,
  requiredErrorMessage,
}: any) {
  if (!currentValue) {
    return requiredErrorMessage;
  } else if (!new RegExp(regex, "i").test(currentValue)) {
    return inValidErrorMessage;
  } else {
    return "";
  }
}
