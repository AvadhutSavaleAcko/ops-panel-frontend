import React, { createContext, useState, useEffect } from "react";
import { debounce } from "@utils/lodash";
import { checkIsPartnerFlow } from "@utils/index";

// add the commen values here
const defaultContextValues = {
  isDesktop: false,
  isFlutterInAppWebViewReady: false
};

export const Context = createContext(defaultContextValues);

export const ContextProvider = ({ children }: any) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFlutterInAppWebViewReady, setIsFlutterInAppWebViewReady] =
    useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsDesktop(window.innerWidth > 768);
    }, 200);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("flutterInAppWebViewPlatformReady", () => {
      //not to fire bridging events in case of partners
      if (!checkIsPartnerFlow()) {
        setIsFlutterInAppWebViewReady(true);
      }
    });
  }, []);

  return (
    <Context.Provider value={{ isDesktop, isFlutterInAppWebViewReady }}>
      {children}
    </Context.Provider>
  );
};
