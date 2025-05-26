import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";
import { verifyOtpMoApi } from "@service/apiServices";
import { setData, deleteGlobalKey } from "@store/slices/globalState";
import { store } from "@store/store";

export const VerifyOtpAndRedirect = async ({ ...payload }) => {
  verifyOtpMoApi(payload.data)
    .then((response: any) => {
      store?.dispatch(deleteGlobalKey({ key: "verifyOtpErrorMessage" }));
      const nextNodePayload = {
        requestBody: {
          journey: "fresh_car",
          ...payload.requestBody
        },
        data: {
          proposal_ekey: payload?.data?.proposal_ekey
        }
      };
      fetchConfigAndRedirect({
        ...nextNodePayload,
        shouldRedirect: true,
        isRouterReplace: true
      });
    })
    .catch((error) => {
      store?.dispatch(setData({ verifyOtpErrorMessage: "Enter a valid OTP" }));
      console.error("Verify Otp Error", error);
    });
};
