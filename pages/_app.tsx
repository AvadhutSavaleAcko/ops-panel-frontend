import React, { useEffect } from "react";
import "@public/css/global.css";
import "@public/css/system.css";
import "@public/css/rc-slider/index.css";
import { ContextProvider } from "@components/useContext/context";
import Head from "next/head";
// import "@styles/tailwind.css";
import type { AppProps } from "next/app";
import { wrapper } from "@store/store";
import {
  AckoMainTheme,
  ThemeProvider
} from "@acko-tech/building-blocks.ui.theme";
import { BasicLoader } from "@acko-tech/building-blocks.ui.loaders";
import { useSelector } from "react-redux";
import { initAckoAnalytics } from "@acko-tech/building-blocks.ui.acko-analytics";
import Cookies from "js-cookie";
import growthbook from "@utils/growthbook";
import Hotjar from "@hotjar/browser";
import { resolvePath } from "@utils/resolvePath";
// import BackTracking from "./trackBack";

function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useSelector(({ configuration }: any) => {
    return {
      isLoading: configuration.isLoading
    };
  });

  useEffect(() => {
    if (process.env.ENVIRONMENT?.toLowerCase() === "production") {
      console.log = () => {};
    }
  }, []);

  useEffect(() => {
    if (window?.wisepops) {
      window?.wisepops("properties", {
        trackerId: Cookies.get("trackerid")
      });
    }
  }, []);

  useEffect(() => {
    growthbook.setAttributes({
      id: Cookies.get("trackerid"),
      user_id: (Cookies.get("user_id") || "").split(":")[0]
    });
    growthbook.loadFeatures();

    hotjarInitialise();
  }, []);

  useEffect(() => {
    if (isLoading) {
      // Disable scrolling
      document.body.classList.add("freeze");
    } else {
      // Enable scrolling
      document.body.classList.remove("freeze");
    }

    return () => {
      document.body.classList.remove("freeze");
    };
  }, [isLoading]);

  const hotjarInitialise = () => {
    const hotjarVersion = 6;
    const siteId = parseInt(process.env.HOTJAR_SITE_ID || "0");
    if (process.env.ENVIRONMENT?.toLowerCase() === "production" && siteId) {
      Hotjar.init(siteId, hotjarVersion);
    }
  };

  return (
    <ContextProvider>
      <ThemeProvider theme={AckoMainTheme}>
        <div>
          <Head>
            <meta name="robots" content="noindex" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
            <link
              rel="dns-prefetch"
              href={
                process.env.ENVIRONMENT === "production"
                  ? "//storefront.ackoassets.com"
                  : "//storefront-dev.ackoassets.com"
              }
            />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
            <link rel="dns-prefetch" href="https://edge.fullstory.com/" />
            <link rel="dns-prefetch" href="https://www.googleadservices.com/" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com/" />
            <link rel="dns-prefetch" href="https://connect.facebook.net/" />

            <title>Acko - ops Panel</title>
            {Cookies.get("trackerid") && (
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: initAckoAnalytics(
                    Cookies.get("trackerid"),
                    process.env.SEGMENT_KEY || ""
                  )
                }}
              ></script>
            )}
            <script
              src="/p/acko-assist/api/public/copilot-v1.js"
              id="copilot"
              defer
            />
            <script
              src="https://www.googletagmanager.com/gtag/js?id=UA-92272448-1"
              type="text/javascript"
              defer
            />
            {process.env.ENVIRONMENT?.toLowerCase() === "production" && (
              <>
                <script
                  src={resolvePath("/js/gtm/head.js")}
                  type="text/javascript"
                  defer
                />
                <script
                  src={resolvePath(`/js/clarity/head.js`)}
                  type="text/javascript"
                  defer
                />
              </>
            )}
            {process.env.ENVIRONMENT?.toLowerCase() === "production" && (
              <script
                src={resolvePath("/js/newrelic/prod.js")}
                type="text/javascript"
                async
              />
            )}
            {process.env.ENVIRONMENT?.toLowerCase() === "development" && (
              <script
                src={resolvePath("/js/newrelic/uat.js")}
                type="text/javascript"
                async
              />
            )}
          </Head>
          <>
            {isLoading && <BasicLoader />}
            <Component {...pageProps} />
          </>
          {/* <BackTracking /> */}
        </div>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default wrapper.withRedux(App);
