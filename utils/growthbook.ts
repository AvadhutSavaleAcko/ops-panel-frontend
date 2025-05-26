import { GrowthBook } from "@growthbook/growthbook-react";
import { pageEvent } from "@acko-tech/building-blocks.ui.acko-analytics";
import { analyticEvents as triggerAnalyticEvent } from "@actions/analyticEvents";
export const GROWTHBOOK_CONSTANTS = {
  DEVELOPMENT: {
    apiHost: "https://growthbook-api.internal.ackodev.com",
    clientKey: "sdk-JkAcfiqoopJ9cDy"
  },
  PRODUCTION: {
    apiHost: "https://ab.acko.com/",
    clientKey: "sdk-GuTiLkcZIIvfH0lL"
  },
  LOCALHOST: {
    apiHost: "https://growthbook-api.internal.ackodev.com",
    clientKey: "sdk-JkAcfiqoopJ9cDy"
  }
};

const credentials =
  GROWTHBOOK_CONSTANTS[(process.env.ENVIRONMENT || "").toUpperCase()];
console.log(process.env.ENVIRONMENT, "env");
const growthbook = new GrowthBook({
  apiHost: credentials?.apiHost,
  clientKey: credentials?.clientKey,
  enableDevMode: process.env.ENVIRONMENT === "production" ? false : true,
  trackingCallback: (experiment, result) => {
    pageEvent("ab_testing", {
      experimentId: experiment.key,
      variationId: result.key
    });
  }
});

export const getFeatureValue = ({ flagName }) => {
  const flagValue = growthbook.isOn(flagName);
  triggerAnalyticEvent({
    edata: {
      product: "car",
      experiment_name: flagName,
      variant_name: `${flagValue}`
    },
    odata: {
      journey: "fresh_car"
    },
    event_name: "feature"
  });
  return flagValue;
};

export const loadGrowthbookFeatures = () => {
  return Promise.race([
    growthbook.loadFeatures(),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("fallback timeout executed");
      }, 600);
    })
  ]);
};

export const isGrowthBookReady = () => {
  return growthbook.ready;
};

export default growthbook;

// Usage:
// At the page level add following snippet to the getInital props method and use the feature to conditionally render components:
// CarPurchaseJourney.getInitialProps = async (ctx: NextPageContext) => {
//   await growthbook.loadFeatures();
// At component level add following snippet to access the feature flag:
// const value = growthbook.getFeatureValue("fresh-car-prequote", "fallback");
// };
