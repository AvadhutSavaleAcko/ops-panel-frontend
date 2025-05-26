import { createSlice } from "@reduxjs/toolkit";

// TODO: add array from config (text and lottieKeys)
// like lottieAnimationKey = ["anim1", "anim2"] and then iterate based on showInitialLottieFull

const initialState: any = {
  showLottie: false,
  lottieAnimationKey: "",
  customAnimationText: "",
  nextLottieAnimationKey: "",
  nextCustomAnimationText: "",
  // to check if lottie animation has completed 1 loop cycle
  lottieAnimationLoopCompleted: false,
  nextAnimationCompleted: false,
  isNextAnimation: false,
  showCouponAnimation: false,
  netPremium: null,
  discountApplied: null,
  // to show the initial lottie until next-node API is not resolved
  showInitialLottieFull: false,
  // to check if next-node is success,
  nextNodeSuccess: false,
  // to handle the buffer when animation is complete and redirection has't happened
  redirectionDone: true,
  //to check the next_node after nextNode is resolved
  nextNodeUpcoming: "",
  isMmvDataFound: false
};

const lottieSlice = createSlice({
  name: "lottie",
  initialState,
  reducers: {
    updateLottieAnimationKey(state, action) {
      state.showLottie = true;
      state.lottieAnimationKey = action.payload?.lottieAnimationKey;
      state.customAnimationText = action.payload?.customAnimationText;
      state.nextLottieAnimationKey = action.payload.nextLottieAnimationKey;
      state.nextCustomAnimationText = action.payload.nextCustomAnimationText;
      state.isNextAnimation = false;
      state.lottieAnimationLoopCompleted = false;
      state.showInitialLottieFull = action.payload.showInitialLottieFull;
      state.redirectionDone = false;
    },
    updateNextLottieAnimationKey(state, action) {
      state.showLottie = true;
      state.lottieAnimationKey = action.payload?.lottieAnimationKey;
      state.customAnimationText = action.payload?.customAnimationText || "";
      state.lottieAnimationLoopCompleted = false;
      state.isNextAnimation = true;
      state.showInitialLottieFull = false;
    },
    updateLottieAnimationLoopCompletedd(state, action) {
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
    skipLottieAnimation(state, action) {
      state.showLottie = action.payload.showLottie;
    },
    updateNextNodeSuccess(state, action) {
      state.nextNodeSuccess = action.payload.nextNodeSuccess;
    },
    updateRedirectionDone(state, action) {
      state.redirectionDone = action.payload.redirectionDone;
    },
    updateNextNodeUpcoming(state, action) {
      state.nextNodeUpcoming = action.payload.nextNodeUpcoming;
    },
    updateIsMmvDataFound(state, action) {
      state.isMmvDataFound = action.payload.isMmvDataFound;
    },
    allLottieAnimationComplete(state, action) {
      return { ...initialState, nextNodeSuccess: true };
    }
  }
});

export const {
  updateLottieAnimationKey,
  updateNextLottieAnimationKey,
  updateLottieAnimationLoopCompletedd,
  updateShowCouponAnimation,
  updateNetPremium,
  skipLottieAnimation,
  updateNextNodeSuccess,
  allLottieAnimationComplete,
  updateNextNodeUpcoming,
  updateIsMmvDataFound,
  updateRedirectionDone
} = lottieSlice.actions;

export default lottieSlice.reducer;
