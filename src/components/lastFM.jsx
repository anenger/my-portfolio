import * as React from "react";

import {
  lastFmDiv,
  lastFmText,
  lastFmImageDiv,
  lastFmImage,
} from "./lastFM.module.css";

const LastFM = () => {
  const [scrobbleData, setScrobbleData] = React.useState({});
  React.useEffect(() => {
    fetch("/api/lastFM")
      .then((response) => {
        return response.json();
      })
      .then((data) => setScrobbleData(data));
  }, []);

  const { error } = scrobbleData;
  const track = scrobbleData?.recenttracks?.track;

  if (!track && !error) {
    return (
      <div className={lastFmDiv}>
        <div className={lastFmText}>
          <p>Loading LastFM data...</p>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className={lastFmDiv}>
        <div className={lastFmText}>
          <p>{error}</p>
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
        <p>
          {"Listening to:"} <br /> {`${songName} by ${artistName}`}
        </p>
      </div>
    </div>
  );
};

export default LastFM;
