export const validateDataAndFields = async ({
  normalisedConfig,
  requiredFields,
  globalPayloadData,
  fieldValue,
  id
}: any): Promise<any> => {
  const updatedNormalisedConfig = JSON.parse(JSON.stringify(normalisedConfig));
  let isError: any = false;
  if (requiredFields?.length > 0) {
    const requiredFieldsWidgets = requiredFields.map((fieldId) => {
      return normalisedConfig?.[fieldId];
    });

    requiredFieldsWidgets?.forEach((fieldToBeValidated) => {
      const { id, props }: any = fieldToBeValidated || {};
      const {
        payloadData: fieldPayloadData,
        validate,
        is_visible
      } = props || {};
      const { name } = fieldPayloadData || {};
      const fieldValue = globalPayloadData?.[name];
      if (
        (!Object.hasOwn(globalPayloadData, name) ||
          fieldValue === "" ||
          fieldValue === null) &&
        is_visible
      ) {
        const data = updatedNormalisedConfig[id];
        isError = true;
        data.props.error_message = validate?.requiredErrorMessage || "";
      }
    });
  } else if (fieldValue !== undefined && id !== undefined) {
    const fieldToBeValidated: any = normalisedConfig[id];
    const { props } = fieldToBeValidated || {};
    const { validate } = props || {};
    const { regex, requiredErrorMessage, inValidErrorMessage } = validate || {};

    const data = updatedNormalisedConfig[id];

    if (!fieldValue) {
      data.props.error_message = requiredErrorMessage;
      isError = true;
    } else if (regex && !new RegExp(regex, "i").test(fieldValue)) {
      data.props.error_message = inValidErrorMessage;
      isError = true;
    } else {
      data.props.error_message = "";
    }
  }

  return { updatedNormalisedConfig, isError };
};
