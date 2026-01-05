import * as React from "react";
import { SiLetterboxd } from "react-icons/si";

import {
  letterboxdContainer,
  letterboxdCard,
  letterboxdBadge,
  letterboxdLogo,
  posterContainer,
  posterImage,
  filmInfo,
  filmTitle,
  filmYear,
  loadingState,
  errorState,
} from "./letterboxd.module.css";
import { useQuery } from "@tanstack/react-query";

export const Letterboxd = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["letterboxd"],
    queryFn: () => fetch("/api/letterboxd").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className={letterboxdContainer}>
        <div className={`${letterboxdCard} ${loadingState}`}>
          <SiLetterboxd className={letterboxdLogo} />
          <p>Loading Letterboxd...</p>
        </div>
      </div>
    );
  }

  if (error || !data || data.error) {
    return (
      <div className={letterboxdContainer}>
        <div className={`${letterboxdCard} ${errorState}`}>
          <SiLetterboxd className={letterboxdLogo} />
          <p>{error?.message || data?.error || "Could not load Letterboxd data"}</p>
        </div>
      </div>
    );
  }

  const { title, year, posterUrl, profileUrl } = data;

  return (
    <div className={letterboxdContainer}>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={letterboxdCard}
      >
        <span className={letterboxdBadge}>
          <SiLetterboxd className={letterboxdLogo} />
          Recently Watched
        </span>

        {posterUrl && (
          <div className={posterContainer}>
            <img
              className={posterImage}
              src={posterUrl}
              alt={`Poster for ${title}`}
            />
          </div>
        )}

        <div className={filmInfo}>
          <span className={filmTitle}>{title}</span>
          {year && <span className={filmYear}>{year}</span>}
        </div>
      </a>
    </div>
  );
};
