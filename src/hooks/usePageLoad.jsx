import { useEffect, useState } from "react";

export const usePageLoad = () => {
  const [isComplete, setIsComplete] = useState(false);
  // This will run one time after the component mounts
  useEffect(() => {
    const onPageLoad = () => {
      setIsComplete(true);
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
  return isComplete;
};
