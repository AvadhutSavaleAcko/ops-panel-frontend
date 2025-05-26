import { store } from "@store/store";
import { setRequestPayload } from "@store/slices/globalState";

export const setRequestPayloadData = (payload) => {
  const { requestBody, payloadData } = payload;

  store?.dispatch(
    setRequestPayload({
      ...requestBody,
      data: {
        ...payloadData,
        origin: "acko",
      },
    }),
  );
};
