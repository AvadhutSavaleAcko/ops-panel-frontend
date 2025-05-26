export const pageView = (path: string) => {
  if (window.parent.location !== window.location) {
    window.parent.dataLayer.push({
      event: "Pageview",
      url: path
    });
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "Pageview",
      url: path
    });
  }
};
