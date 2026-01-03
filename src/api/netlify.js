import fetch from "node-fetch";

export default async function handler(req, res) {
  const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!accessToken || !siteId) {
    return res.json({
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
      return res.json({
        error: "No deployments found",
      });
    }

    const latestDeploy = deploys[0];

    // Map Netlify states to simpler status
    // Netlify states: enqueued, building, uploading, uploaded, ready, error, skipped
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

    res.json({
      status,
      state: latestDeploy.state,
      commitRef: latestDeploy.commit_ref,
      commitMessage: latestDeploy.title || latestDeploy.commit_message,
      branch: latestDeploy.branch,
      deployId: latestDeploy.id,
      createdAt: latestDeploy.created_at,
      publishedAt: latestDeploy.published_at,
      deployUrl: latestDeploy.deploy_ssl_url,
      adminUrl: latestDeploy.admin_url,
    });
  } catch (error) {
    res.json({
      error: error.message || "Failed to fetch deployment status",
    });
  }
}
