import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET() {
  const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!accessToken || !siteId) {
    return NextResponse.json({
      error: "Missing Netlify configuration",
    });
  }

  const url = `https://api.netlify.com/api/v1/sites/${siteId}/deploys?per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Netlify API error: ${response.status}`);
    }

    const deploys = await response.json();

    if (!deploys || deploys.length === 0) {
      return NextResponse.json({
        error: "No deployments found",
      });
    }

    const latestDeploy = deploys[0];

    const stateMap = {
      enqueued: "pending",
      building: "building",
      uploading: "building",
      uploaded: "building",
      ready: "ready",
      error: "error",
      skipped: "skipped",
    };

    const status = stateMap[latestDeploy.state] || "unknown";

    return NextResponse.json({
      status,
      commitRef: latestDeploy.commit_ref,
      branch: latestDeploy.branch,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || "Failed to fetch deployment status",
    });
  }
}
