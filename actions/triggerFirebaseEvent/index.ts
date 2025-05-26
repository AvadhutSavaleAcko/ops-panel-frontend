import Cookies from "js-cookie";

export const triggerFirebaseEvent = (args) => {
  const { isFlutterInAppWebViewReady, event_name, event_properties } = args;
  if (
    Cookies.get("webview") !== undefined &&
    window?.flutter_inappwebview?.callHandler &&
    isFlutterInAppWebViewReady
  ) {
    const smartWebViewData = {
      action: "send_event",
      action_value: {
        destination: "firebase",
        event_name,
        event_params: [
          {
            cid: Cookies.get("_ga"),
            tracker: Cookies.get("trackerid"),
            ...event_properties
          }
        ]
      }
    };
    const resSmartWebViewData = JSON.stringify(smartWebViewData);

    window?.flutter_inappwebview?.callHandler(
      "WebViewConnect",
      resSmartWebViewData
    );
  }
};
