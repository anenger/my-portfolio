import fetch from "node-fetch";

export default async function handler(req, res) {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`;

  try {
    const result = await fetch(url).then((resp) => {
      return resp.json();
    });

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Whoops! Something went wrong with Last.fm" });
  }
}
