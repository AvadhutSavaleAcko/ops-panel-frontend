// Custom TypeScript module definitions :)

declare module "*.svg" {
  const content: string | any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default content;
}

declare module "*.jpg" {
  const content: string | any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default content;
}

declare module "*.png" {
  const content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default content;
}

declare module "*.gif" {
  const content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default content;
}

interface Window {
  Razorpay: any;
  __NEXT_DATA__: any;
  basePath: any;
  grecaptcha: any;
  webengage: any;
  isDesktop: any;
  flutter_inappwebview: any;
  wisepops: any;
  product: any;
  microapps: any;
  newrelic: any;
  platform: string;
  xRootPath: string;
  dataLayer: any;
}

namespace JSX {
  interface IntrinsicElements {
    "acko-copilot": any;
  }
}
