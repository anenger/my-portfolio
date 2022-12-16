// React hook to get the width of the window
import { useState, useEffect } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(undefined);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { width, isMobile };
};
