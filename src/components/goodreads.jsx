import * as React from "react";
import { FaGoodreads } from "react-icons/fa";

import {
  goodreadsContainer,
  goodreadsCard,
  goodreadsBadge,
  goodreadsLogo,
  coverContainer,
  coverImage,
  bookInfo,
  bookTitle,
  bookAuthor,
  loadingState,
  errorState,
} from "./goodreads.module.css";
import { useQuery } from "@tanstack/react-query";

export const Goodreads = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["goodreads"],
    queryFn: () => fetch("/api/goodreads").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className={goodreadsContainer}>
        <div className={`${goodreadsCard} ${loadingState}`}>
          <FaGoodreads className={goodreadsLogo} />
          <p>Loading Goodreads...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={goodreadsContainer}>
        <div className={`${goodreadsCard} ${errorState}`}>
          <FaGoodreads className={goodreadsLogo} />
          <p>{error || "Could not load Goodreads data"}</p>
        </div>
      </div>
    );
  }

  const { title, author, coverUrl, profileUrl, shelf } = data;
  const isCurrentlyReading = shelf === "currently-reading";

  return (
    <div className={goodreadsContainer}>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={goodreadsCard}
      >
        <span className={goodreadsBadge}>
          <FaGoodreads className={goodreadsLogo} />
          {isCurrentlyReading ? "Currently Reading" : "Recently Read"}
        </span>

        {coverUrl && (
          <div className={coverContainer}>
            <img
              className={coverImage}
              src={coverUrl}
              alt={`Cover for ${title}`}
            />
          </div>
        )}

        <div className={bookInfo}>
          <span className={bookTitle}>{title}</span>
          {author && <span className={bookAuthor}>by {author}</span>}
        </div>
      </a>
    </div>
  );
};
