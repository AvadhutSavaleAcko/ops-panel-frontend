import axios from "axios";
import { store } from "@store/store";
import {
  updateNetPremium,
  updateShowCouponAnimation
} from "@store/slices/config";
import { StringToNumberPrice } from "@utils/index";
import { skipLottieAnimation } from "@store/slices/lottieState";
const headers: any = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Accept-Language": "en-US",
  "Cache-Control": "no-cache",
  Referer: "https://example.com",
  "x-journey-version": "v3"
};

const customPostCall = (endpoint: string, payload: any) => {
  const url = `${process.env.SDUI_API_SERVICE}/${endpoint}`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, headers)
      .then((response) => {
        if (response?.data?.coupons?.coupon_code_max_discount_value > 100) {

          store?.dispatch(
            updateShowCouponAnimation({
              showCouponAnimation: true
            })
          );
          store?.dispatch(skipLottieAnimation({ showLottie: false }));
          store?.dispatch(
            updateNetPremium({
              netPremium: StringToNumberPrice(
                response?.data?.premiumBreakup?.netPremium
              ),
              discountApplied:
                response?.data?.coupons?.total_discount_amount_applied
            })
          );
        } else {
          store?.dispatch(
            updateShowCouponAnimation({
              showCouponAnimation: false
            })
          );
          store?.dispatch(
            updateNetPremium({
              netPremium: null,
              discountApplied:
                response?.data?.coupons?.total_discount_amount_applied
            })
          );
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { customPostCall };
