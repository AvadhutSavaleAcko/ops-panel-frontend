import { setDashboardData, clearDashboardData } from "@store/slices/dashboardState";

export const handleTabClick = (payload: any) => (dispatch: any) => {
  dispatch(setDashboardData({
    activeTab: payload.activeTab,
    activeTabData: payload.activeTabData,
    showForm: false,
    showConfigureModel: false
  }));
};

export const handleAddModelClick = () => (dispatch: any) => {
  dispatch(setDashboardData({
    activeTab: null,
    activeTabData: [],
    showForm: true,
    showConfigureModel: false
  }));
};

export const handleTabSelection = (tabName: string, tabData: any[]) => {
  return (dispatch: any) => {
    dispatch(setDashboardData({
      activeTab: tabName,
      activeTabData: tabData,
      showForm: false,
      showConfigureModel: false
    }));
  };
};

export const showAddModelForm = () => {
  return (dispatch: any) => {
    dispatch(setDashboardData({
      activeTab: null,
      activeTabData: [],
      showForm: true,
      showConfigureModel: false
    }));
  };
};

export const submitModelForm = (formData: any) => {
  return (dispatch: any) => {
    dispatch(setDashboardData({
      showForm: false,
      dataToConfigureNewModel: formData
    }));
  };
};

export const updateTableData = (data: any[]) => {
  return (dispatch: any) => {
    dispatch(setDashboardData({
      activeTabData: data
    }));
  };
};

export const handleTabChange = (tabName: string, tabData: any[]) => {
  return (dispatch: any) => {
    dispatch(setDashboardData({
      activeTab: tabName,
      activeTabData: tabData,
      showForm: false,
      showConfigureModel: false
    }));
  };
};

export const updateModalVisibility = ({ componentId, props }: any) => {
  return (dispatch: any) => {
    dispatch({
      type: 'UPDATE_PROPS',
      payload: {
        componentId,
        props
      }
    });
  };
};