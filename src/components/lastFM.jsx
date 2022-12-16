import * as React from "react";

import {
  lastFmDiv,
  lastFmText,
  lastFmImageDiv,
  lastFmImage,
} from "./lastFM.module.css";

const LastFM = () => {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`;

  const [scrobbleData, setScrobbleData] = React.useState({});
  React.useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error");
      })
      .then((data) => setScrobbleData(data))
      .catch(() =>
        setScrobbleData({ error: "Whoops! Something went wrong with Last.fm" })
      );
  }, [url]);

  const { error } = scrobbleData;
  const track = scrobbleData?.recenttracks?.track;

  if (!track) {
    return (
      <div className={lastFmDiv}>
        <div className={lastFmText}>
          <p>Loading LastFM data...</p>
        </div>
      </div>
    );
  }

  const [
    {
      name: songName,
      artist: { "#text": artistName },
      image: albumData,
    },
  ] = track;

  const albumArt = albumData.slice(-1)[0]["#text"];

  return (
    <div className={lastFmDiv}>
      <div className={lastFmImageDiv}>
        <img
          className={lastFmImage}
          src={albumArt}
          alt={"Album art for current song"}
        ></img>
      </div>
      <div className={lastFmText}>
        {error ? (
          <p>{error}</p>
        ) : (
          <p>
            {"Listening to:"} <br /> {`${songName} - ${artistName}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default LastFM;
