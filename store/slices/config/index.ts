import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  config: {},
  normalisedConfig: {},
  error: null,
  isLoading: false,
  isSuccess: true,
  showLottie: false,
  normalisedConfigSuccess: false,
  lottieAnimationKey: "",
  customAnimationText: "",
  // to check if lottie animation has completed 1 loop cycle  
  lottieAnimationLoopCompleted: false,
  showCouponAnimation: false,
  netPremium: null,
  discountApplied: null,
  shouldRedirectToPlansNode: false
};

const configSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    fetchConfigStart(state, action) {
      state.isLoading = action.payload?.showBasicLoader;
      state.isSuccess = false;
      state.normalisedConfigSuccess = false;
      state.error = null;
      state.showLottie = action.payload?.showLottie;
      state.lottieAnimationKey = action.payload?.lottieAnimationKey;
      state.customAnimationText = action.payload?.customAnimationText;
      state.lottieAnimationLoopCompleted = false;
    },
    fetchConfigSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.config = action.payload;
      state.showLottie = false;
      (state.lottieAnimationKey = ""), (state.customAnimationText = "");
      state.showCouponAnimation = false;
    },
    fetchConfigFailure(state, action) {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
      state.showLottie = false;
      state.lottieAnimationKey = "";
      state.customAnimationText = "";
      state.lottieAnimationLoopCompleted = false;
    },
    fetchNormalisedConfigSuccess(state, action) {
      state.isLoading = false;
      state.normalisedConfig = action.payload;
      state.normalisedConfigSuccess = true;
    },
    updateNormalisedConfig(state, action) {
      state.normalisedConfig = action.payload.normalisedConfig;
    },
    // todo: decouple below action from config, make a new slice for it
    updateLottieAnimationLoopCompleted(state, action) {
      state.lottieAnimationLoopCompleted =
        action.payload.lottieAnimationLoopCompleted;
    },
    updateShowCouponAnimation(state, action) {
      state.showCouponAnimation = action.payload.showCouponAnimation;
    },
    updateNetPremium(state, action) {
      state.netPremium = action.payload.netPremium;
      state.discountApplied = action.payload.discountApplied;
    },
    updateShouldRedirectToPlansNode(state, action) {
      state.shouldRedirectToPlansNode =
        action.payload.shouldRedirectToPlansNode;
    }
  }
});

export const {
  fetchConfigStart,
  fetchConfigSuccess,
  fetchConfigFailure,
  fetchNormalisedConfigSuccess,
  updateNormalisedConfig,
  updateLottieAnimationLoopCompleted,
  updateShowCouponAnimation,
  updateNetPremium,
  updateShouldRedirectToPlansNode
} = configSlice.actions;

export default configSlice.reducer;
