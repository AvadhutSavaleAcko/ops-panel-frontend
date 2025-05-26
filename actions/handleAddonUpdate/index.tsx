import { ADDANDREMOVE } from "@actions/handleApplyDiscount";
import { customPostCall } from "@service/customPostCall";
import { analyticEvents as triggerAnalyticEvent } from "@actions/analyticEvents";


export const handleAddonUpdate = (args) => {
    return customPostCall("updateAddons", args);
};

export const handleUpdateAddonAndUpdateProps = async (
    isUserApplied,
    setIsLoading,
    proposal_ekey,
    on_click,
    setisUserApplied,
    id
) => {
    setIsLoading(true);
    try {
        const currentPayloadData = {
            interaction: isUserApplied ? ADDANDREMOVE.REMOVE : ADDANDREMOVE.ADD,
            proposal_ekey
        };

        const updateDiscountFunction = on_click?.[0];
        let payload = {
            ...currentPayloadData,
            ...updateDiscountFunction.args
        };
        let updatedPremiunData;
        let updatedNetPremium;
        if (
            updateDiscountFunction &&
            typeof updateDiscountFunction.funCall === "function"
        ) {
            const res = await updateDiscountFunction.funCall(payload || {});
            setisUserApplied(!isUserApplied);
            const { premiumBreakup } = res || {};
            const { premiumData, netPremium } = premiumBreakup;
            updatedPremiunData = premiumData;
            updatedNetPremium = netPremium;
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
                isSelected: !isUserApplied
            }
        ];
        const customPayload = {
            ...updateNormalisedData.args,
            updatedProps
        };
        customPayload?.ids?.push(id)
        if (
            updateNormalisedData &&
            typeof updateNormalisedData.funCall === "function"
        ) {
            updateNormalisedData.funCall(customPayload || {});
        }
        await triggerAnalyticEvent({
            edata: {
                product: "car",
                action_name: isUserApplied ? "tap_btn_add_on_removed" : "tap_btn_add_on_selected",
                action_type: "tap_btn",
                add_on_id: updateDiscountFunction?.args?.id
            },
            odata: {
                journey: "fresh_car"
            },
            event_name: "action"
        })
    } catch (error) {
        console.log("Error", error);
    } finally {
        setIsLoading(false);
    }
    return null;
};
