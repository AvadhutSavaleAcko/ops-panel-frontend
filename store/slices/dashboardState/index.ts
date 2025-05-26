import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  activeTab: string | null;
  activeTabData: any[];
  showForm: boolean;
  showConfigureModel: boolean;
  dataToConfigureNewModel: any;
}

const initialState: DashboardState = {
  activeTab: null,
  activeTabData: [],
  showForm: false,
  showConfigureModel: false,
  dataToConfigureNewModel: null
};

const dashboardSlice = createSlice({
  name: "dashboardState",
  initialState,
  reducers: {
    setDashboardData(state, action) {
      console.log("setDashboardData action payload", action.payload);
      return { ...state, ...action.payload };
    },
    clearDashboardData() {
      return initialState;
    }
  }
});

export const { setDashboardData, clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;