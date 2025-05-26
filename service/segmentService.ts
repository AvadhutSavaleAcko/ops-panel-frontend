/* eslint-disable */
interface segmentPaylaod {
  event_name: String;
  customAttributes: any;
}
import {
  trackEvent,
  identifyEvent,
  pageEvent,
} from "@acko-tech/building-blocks.ui.acko-analytics";
import Cookies from "js-cookie";

export const identifyPropertiesList = [
  "email_id",
  "pincode",
  "phone",
  "full_name",
];

export const identifyMapping = {
  pincode: "pincode",
  email_id: "email",
  full_name: "name",
  phone: "phone",
  city: "city",
  address: "address",
  landmark: "landmark",
};

export const trackAPI = ({ event_name, customAttributes }: segmentPaylaod) => {
  console.log("segments", event_name, customAttributes);
  trackEvent(event_name, customAttributes);
};

export const viewAPI = ({ event_name, customAttributes }: segmentPaylaod) => {
  console.log("segments", event_name, customAttributes);
  pageEvent(event_name, customAttributes);
};

export const IdentifyAPI = (data) => {
  const idenifyProperties = Object.keys(data).reduce((acc, curr) => {
    if (identifyPropertiesList.includes(curr)) {
      acc[identifyMapping[curr]] = data[curr];
    }
    return acc;
  }, {});
  if (Object.keys(idenifyProperties).length > 0) {
    const user_id = Cookies.get("user_id")
      ? Cookies.get("user_id")?.split(":")[0]
      : "";
    const identifier = user_id;
    identifier && identifyEvent(identifier, idenifyProperties);
  }
};
