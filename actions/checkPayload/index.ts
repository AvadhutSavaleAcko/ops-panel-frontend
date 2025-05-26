import { store } from "@store/store";

export const checkPayload = ({ key }) => {
  const payloadData = store?.getState()?.globalState?.payloadData;
  return payloadData[key] || null;
};
