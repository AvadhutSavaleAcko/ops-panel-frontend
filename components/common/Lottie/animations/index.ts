import registrationNumber from "@components/common/Lottie/animations/registration-number.json";
import loaderAnimation from "@components/common/Lottie/animations/loader-animation.json";
import weFoundYourCar from "@components/common/Lottie/animations/we-found-your-car.json";
import calculationPremium from "@components/common/Lottie/animations/calculating.json";
import plansPageLoader from "@components/common/Lottie/animations/plans.json";
import discountAnimation from "@components/common/Lottie/animations/discount.json";
import congratsAnim from "@components/common/Lottie/animations/congrats.json";
import tickAnimation from "@components/common/Lottie/animations/tick-animation.json";
import PendingChallan from "./pending_challan.json";
import NoPendingChallan from "./no_pending_challan.json";
import LookingChallan from "./looking_challan.json";

export const LottieConstants = {
  LOADER_ANIMATION: loaderAnimation,
  REGISTRATION_NUMBER: registrationNumber,
  WE_FOUND_YOUR_CAR: weFoundYourCar,
  CALCULATION_PREMIUM: calculationPremium,
  PLANS_LOADER: plansPageLoader,
  DISCOUNT_ANIMATION: discountAnimation,
  CONGRATS_ANIMATION: congratsAnim,
  TICK_ANIMATION: tickAnimation,
  LOOKING_FOR_CHALLAN: LookingChallan,
  PENDING_CHALLAN: PendingChallan,
  NO_PENDING_CHALLAN: NoPendingChallan
};

export const TextMapping = {
  enter_mmv_details_node: "",
  previous_claim_confirmation_node: "Fetching your personal details...",
  previous_policy_confirmation_node: "Fetching your personal details...",
  checkout_details_node:
    "Almost there! <br/> Calculating your final premium...",
  verify_otp_node: "Almost there! <br/> Calculating your final premium...",
  checkout_review_node: "Redirecting to payment gateway...",
  checkout_edit_and_review__node: "Redirecting to payment gateway...",
  // user_info_node: "Finding the right plans for you",
  discount_node: "Fetching additional covers for you...",
  plan_selection_node: "Just a moment...",
  plan_variants_node: "Checking for discounts and additional covers...",
  family_addons_node: "Confirming a few details..."
};

export const AfterSuccessLottie = {
  user_info_node: "GIF_SUCCESS"
};
