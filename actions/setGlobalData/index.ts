import { store } from "@store/store";
import { setData } from "@store/slices/globalState";

export const setGlobalData = (payload) =>{
    const {globalData} = payload
    store?.dispatch(setData(globalData))
}