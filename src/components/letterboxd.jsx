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

export const Letterboxd = () => {
  const [filmData, setFilmData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/letterboxd")
      .then((response) => response.json())
      .then((data) => {
        setFilmData(data);
        setLoading(false);
      })
      .catch(() => {
        setFilmData({ error: "Could not load Letterboxd data" });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={letterboxdContainer}>
        <div className={`${letterboxdCard} ${loadingState}`}>
          <SiLetterboxd className={letterboxdLogo} />
          <p>Loading Letterboxd...</p>
        </div>
      </div>
    );
  }

  if (filmData?.error) {
    return (
      <div className={letterboxdContainer}>
        <div className={`${letterboxdCard} ${errorState}`}>
          <SiLetterboxd className={letterboxdLogo} />
          <p>{filmData.error}</p>
        </div>
      </div>
    );
  }

  const { title, year, posterUrl, profileUrl } = filmData;

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
