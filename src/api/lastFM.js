import fetch from "node-fetch";

export default async function handler(req, res) {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`;

  const result = await fetch(url)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Something went wrong with Last.fm");
      }
    })
    .catch(() => {
      return { error: "Whoops! Something went wrong with Last.fm" };
    });

  // Add profile URL to response
  result.profileUrl = `https://www.last.fm/user/${username}`;

  res.json(result);
}
