import * as React from "react";
import { SiLastdotfm } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";

import {
  lastfmContainer,
  lastfmCard,
  lastfmBadge,
  lastfmLogo,
  albumContainer,
  albumImage,
  trackInfo,
  trackTitle,
  trackArtist,
  loadingState,
  errorState,
} from "./lastFM.module.css";

export const LastFM = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["lastFM"],
    queryFn: () => fetch("/api/lastFM").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className={lastfmContainer}>
        <div className={`${lastfmCard} ${loadingState}`}>
          <SiLastdotfm className={lastfmLogo} />
          <p>Loading Last.fm...</p>
        </div>
      </div>
    );
  }

  const track = data?.recenttracks?.track;

  if (error || !data || data.error || !track) {
    return (
      <div className={lastfmContainer}>
        <div className={`${lastfmCard} ${errorState}`}>
          <SiLastdotfm className={lastfmLogo} />
          <p>{error?.message || data?.error || "No recent tracks"}</p>
        </div>
      </div>
    );
  }

  const { profileUrl } = data;

  const [
    {
      name: songName,
      artist: { "#text": artistName },
      image: albumData,
      "@attr": nowPlayingAttr,
    },
  ] = track;

  const isNowPlaying = nowPlayingAttr?.nowplaying === "true";
  const albumArt = albumData.slice(-1)[0]["#text"];

  return (
    <div className={lastfmContainer}>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={lastfmCard}
      >
        <span className={lastfmBadge}>
          <SiLastdotfm className={lastfmLogo} />
          {isNowPlaying ? "Now Playing" : "Last Played"}
        </span>

        {albumArt && (
          <div className={albumContainer}>
            <img
              className={albumImage}
              src={albumArt}
              alt={`Album art for ${songName}`}
            />
          </div>
        )}

        <div className={trackInfo}>
          <span className={trackTitle}>{songName}</span>
          <span className={trackArtist}>{artistName}</span>
        </div>
      </a>
    </div>
  );
};
