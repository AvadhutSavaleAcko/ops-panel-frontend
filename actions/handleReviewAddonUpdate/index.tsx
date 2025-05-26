import { customPostCall } from "@service/customPostCall";

export const handleReviewAddonUpdate = (args) => {
    return customPostCall("v2/updateAddons", args);
};