import { setGlobalData } from "@actions/setGlobalData";
import { updateProps } from "@actions/updateProps";
import { customPostCall } from "@service/customPostCall";

export const handleApplyDiscount = (args) => {
    return customPostCall("updateCoupons", args);
};

export const ADDANDREMOVE = {
    ADD: "add",
    REMOVE: "remove"
};

export const handleApplyDiscountAndUpdateProps = async (
    isUserApplied,
    setIsLoading,
    proposal_ekey,
    on_click,
    setisUserApplied,
    couponCode = "",
    onDiscountSuccess,
    onDiscountfailure,
    setCouponCode,
    id
) => {
    setIsLoading(true);
    try {
        const currentPayloadData = {
            status: isUserApplied ? ADDANDREMOVE.REMOVE : ADDANDREMOVE.ADD,
            proposal_ekey
        };

        const updateDiscountFunction = on_click?.[0];
        let payload = {
            ...currentPayloadData,
            ...updateDiscountFunction.args
        };
        if (updateDiscountFunction.args.is_hidden_coupon) {
            payload = {
                ...payload,
                couponId: couponCode,
                coupon_display_name: couponCode
            };
        }
        let updatedPremiunData;
        let updatedNetPremium;
        let updatedCouponValue;
        if (
            updateDiscountFunction &&
            typeof updateDiscountFunction.funCall === "function"
        ) {
            const res = await updateDiscountFunction.funCall(payload || {});
            const { coupons, premiumBreakup } = res || {};
            const { premiumData, netPremium } = premiumBreakup;
            if (coupons?.errorMessage) {
                if (
                    onDiscountfailure?.[0] &&
                    typeof onDiscountfailure[0].funCall === "function"
                ) {
                    onDiscountfailure[0].funCall(onDiscountfailure[0].args || {});
                }
                return coupons.errorMessage;
            }
            if (coupons?.success) {
                setisUserApplied(!isUserApplied);
                const gloablData = { selectedDiscount: coupons?.coupon_code };
                setGlobalData({
                    globalData: gloablData
                });
                updatedPremiunData = premiumData;
                updatedNetPremium = netPremium;
                updatedCouponValue = coupons?.applied_discount_value;
                const totalDiscountApplied = coupons?.total_discount_amount_applied || 0;
                const updateddisclaimerContent = `Cheers! You saved <span style='font-weight:600; color:#0B753E'>₹${totalDiscountApplied}</span> on your premium`;
                if (
                    onDiscountSuccess?.length > 0 &&
                    typeof onDiscountSuccess[0].funCall === "function"
                ) {
                    onDiscountSuccess?.forEach((eachFunc: any) => {
                        if (typeof eachFunc.funCall === "function") {
                            const { args } = eachFunc;
                            if (args.update_props?.disclaimer && totalDiscountApplied > 0) {
                                const updatedArgs = {
                                    ...args,
                                    update_props: {
                                        ...args.update_props,
                                        disclaimer: {
                                            ...args.update_props.disclaimer,
                                            disclaimerContent: updateddisclaimerContent
                                        }
                                    }
                                };
                                eachFunc.funCall(updatedArgs);
                            } else {
                                eachFunc.funCall(eachFunc.args);
                            }
                        }
                    });
                }
                // setCouponCode("");
            } else {
                if (
                    onDiscountfailure?.[0] &&
                    typeof onDiscountfailure[0].funCall === "function"
                ) {
                    onDiscountfailure[0].funCall(onDiscountfailure[0].args || {});
                }
            }
        }

        const updateNormalisedData = on_click?.[1];
        const updatedProps = [
            {
                premiumData: updatedPremiunData,
                netPremium: updatedNetPremium
            },
            {
                price: updatedNetPremium
            },
            {
                value: updatedCouponValue,
                code: couponCode
            }
        ];
        const customPayload = {
            ...updateNormalisedData.args,
            updatedProps
        };
        if (
            updateNormalisedData &&
            typeof updateNormalisedData.funCall === "function"
        ) {
            updateNormalisedData.funCall(customPayload || {});
        }
        updateProps(id, { couponValue: updatedCouponValue, value: updatedCouponValue });
    } catch (error) {
        console.log("Error", error);
    } finally {
        setIsLoading(false);
    }
    return null;
};
