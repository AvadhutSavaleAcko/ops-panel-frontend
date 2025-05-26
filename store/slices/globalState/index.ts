import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface toastInterface {
  toastMessage: string;
  toastMessageType: string;
  timeout?: number;
}
interface UserState {
  payloadData: any;
  requestPayload: any;
  toastData: toastInterface;
  fieldErrorData: any;
  activeTab: string | null;
  activeTabData: any[];
  showForm: boolean;
  showConfigureModel: boolean;
  dataToConfigureNewModel: any;
  components: Record<string, any>;
}

const initialState: UserState = {
  payloadData: {},
  requestPayload: {},
  toastData: {
    toastMessage: "",
    toastMessageType: "",
    timeout: 3000
  },
  fieldErrorData: {
    message: "",
    componentName: "",
    show: false
  },
  activeTab: null,
  activeTabData: [],
  showForm: false,
  showConfigureModel: false,
  dataToConfigureNewModel: null,
  components: {}
};

const GlobalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setData(state, action) {
      return { ...state, ...action.payload };
    },
    setPayloadData(state, action) {
      return {
        ...state,
        payloadData: { ...state.payloadData, ...action.payload }
      };
    },
    setRequestPayload(state, action) {
      return {
        ...state,
        requestPayload: { ...state.requestPayload, ...action.payload }
      };
    },
    setToastData(state, action: PayloadAction<toastInterface>) {
      return {
        ...state,
        toastData: { ...state.toastData, ...action.payload }
      };
    },
    setFieldErrorData(state, action) {
      return {
        ...state,
        fieldErrorData: { ...state.fieldErrorData, ...action.payload }
      };
    },
    removePayloadKey(state, action) {
      const keyToRemove = action.payload;

      if (keyToRemove in state.payloadData) {
        const { [keyToRemove]: _, ...remainingPayloadData } = state.payloadData;

        return {
          ...state,
          payloadData: remainingPayloadData
        };
      }
      return state;
    },
    resetState() {
      return { ...initialState };
    },
    deleteGlobalKey: (state, action) => {
      const { key } = action.payload;
      if (key in state) {
        delete state[key];
      }
    },
    resetToastData(state) {
      return {
        ...state,
        toastData: { ...initialState.toastData }
      };
    },
    resetFieldErrorData(state) {
      return {
        ...state,
        fieldErrorData: { ...initialState.fieldErrorData }
      };
    },
    resetPayload(state, action) {
      return {
        ...state,
        payloadData: {}
      };
    },
    setGlobalData(state, action) {
      return { ...state, ...action.payload };
    },
    updateComponentProps(state, action) {
      const { componentId, props } = action.payload;
      return {
        ...state,
        components: {
          ...state.components,
          [componentId]: {
            ...state.components?.[componentId],
            ...props
          }
        }
      };
    },
    submitModelForm(state, action) {
      return {
        ...state,
        showForm: false,
        dataToConfigureNewModel: action.payload
      };
    }
  }
});

export const {
  setData,
  setPayloadData,
  setRequestPayload,
  deleteGlobalKey,
  removePayloadKey,
  resetState,
  setToastData,
  resetToastData,
  setFieldErrorData,
  resetFieldErrorData,
  resetPayload,
  setGlobalData,
  updateComponentProps
} = GlobalSlice.actions;
export default GlobalSlice.reducer;
