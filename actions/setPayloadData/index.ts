import { store } from "@store/store";
import { setPayloadData } from "@store/slices/globalState";

export const setPayload = (payload) =>{
    const {payloadData} = payload
    store?.dispatch(setPayloadData(payloadData))
}