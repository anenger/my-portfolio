import * as React from "react";

import {
  statusContainer,
  statusLight,
  statusLightPending,
  statusLightBuilding,
  statusLightReady,
  statusLightError,
  statusText,
  commitLink,
  pulseAnimation,
} from "./deploymentStatus.module.css";
import { hoverUnderlineAnimation } from "./global.module.css";
import { useQuery } from "@tanstack/react-query";

export const DeploymentStatus = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["deploymentStatus"],
    queryFn: () => fetch("/api/netlify").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className={statusContainer}>
        <span className={`${statusLight} ${statusLightPending}`}></span>
        <span className={statusText}>Loading deployment status...</span>
      </div>
    );
  }

  if (error || !data) {
    return null; // Silently fail if we can't get deployment info
  }

  const { status, commitRef, branch } = data;
  const shortCommit = commitRef ? commitRef.substring(0, 7) : "unknown";

  // Determine the light color class based on status
  const getLightClass = () => {
    switch (status) {
      case "ready":
        return statusLightReady;
      case "building":
        return `${statusLightBuilding} ${pulseAnimation}`;
      case "error":
        return statusLightError;
      case "pending":
        return `${statusLightPending} ${pulseAnimation}`;
      case "skipped":
      default:
        return statusLightPending;
    }
  };

  // Get human-readable status text
  const getStatusText = () => {
    switch (status) {
      case "ready":
        return "Deployed";
      case "building":
        return "Building";
      case "error":
        return "Failed";
      case "pending":
        return "Pending";
      case "skipped":
        return "Skipped";
      default:
        return "Unknown";
    }
  };

  // Build GitHub commit URL (assuming GitHub)
  const commitUrl = commitRef
    ? `https://github.com/anenger/my-portfolio/commit/${commitRef}`
    : null;

  return (
    <div className={statusContainer}>
      <span className={`${statusLight} ${getLightClass()}`}></span>
      <span className={statusText}>
        {getStatusText()}
        {branch && ` · ${branch}`}
        {commitUrl ? (
          <>
            {" · "}
            <a
              href={commitUrl}
              className={`${commitLink} ${hoverUnderlineAnimation}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {shortCommit}
            </a>
          </>
        ) : (
          ` · ${shortCommit}`
        )}
      </span>
    </div>
  );
};
