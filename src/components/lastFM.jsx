import * as React from "react";
import { useWidth } from "../hooks/useWidth";

import {
  lastFmDiv,
  lastFmText,
  lastFmImageDiv,
  lastFmImage,
} from "./lastFM.module.css";

const LastFM = () => {
  const [scrobbleData, setScrobbleData] = React.useState({});
  const width = useWidth();
  const isMobile = width < 800;
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

  const smallAlbum = albumData[2]["#text"];
  const albumArt = albumData.slice(-1)[0]["#text"];

  return (
    <div className={lastFmDiv}>
      <div className={lastFmImageDiv}>
        <img
          className={lastFmImage}
          src={isMobile ? smallAlbum : albumArt}
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
