import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousInsurer: null,
  pped: null,
  couponAmount: null,
  challanPending: null
};

const challanSlice = createSlice({
  name: "challanState",
  initialState,
  reducers: {
    setVehicleData(state, actions) {
      return {
        ...state,
        ...actions.payload
      };
    },
    resetVehicleData() {
      return {
        ...initialState
      };
    },
    checkIfChallanPending(state, actions) {
      state.challanPending = actions.payload;
    }
  }
});

export const { setVehicleData, resetVehicleData, checkIfChallanPending } =
  challanSlice.actions;

export default challanSlice.reducer;
