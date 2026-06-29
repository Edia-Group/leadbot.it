import { getTypebotCookie } from "@typebot.io/telemetry/cookies/helpers";
import { useEffect, useState } from "react";

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const NUCLEOCookie = getTypebotCookie(document.cookie);
    if (NUCLEOCookie?.lastProvider || NUCLEOCookie?.landingPage?.isMerged)
      setIsAuthenticated(true);
  }, []);

  return isAuthenticated;
};
