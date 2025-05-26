import { useEffect } from "react";

const useRemoveModalBackgroundScroll = (showModal: boolean) => {
  useEffect(() => {
    if (showModal) {
      // Disable scrolling
      document.body.classList.add("freeze");
    }

    return () => {
      document.body.classList.remove("freeze");
    };
  }, [showModal]);
};

export default useRemoveModalBackgroundScroll;
