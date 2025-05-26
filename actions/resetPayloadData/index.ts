import { resetPayload } from "@store/slices/globalState";
import { store } from "@store/store";

export const resetPayloadData = () => {
    store?.dispatch(resetPayload({}))
}