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
  ratingContainer,
  starFilled,
  starEmpty,
  loadingState,
  errorState,
} from "./goodreads.module.css";

const StarRating = ({ rating }) => {
  if (!rating) return null;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? starFilled : starEmpty}>
        ★
      </span>
    );
  }

  return <div className={ratingContainer}>{stars}</div>;
};

export const Goodreads = () => {
  const [bookData, setBookData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/goodreads")
      .then((response) => response.json())
      .then((data) => {
        setBookData(data);
        setLoading(false);
      })
      .catch(() => {
        setBookData({ error: "Could not load Goodreads data" });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={goodreadsContainer}>
        <div className={`${goodreadsCard} ${loadingState}`}>
          <FaGoodreads className={goodreadsLogo} />
          <p>Loading Goodreads...</p>
        </div>
      </div>
    );
  }

  if (bookData?.error) {
    return (
      <div className={goodreadsContainer}>
        <div className={`${goodreadsCard} ${errorState}`}>
          <FaGoodreads className={goodreadsLogo} />
          <p>{bookData.error}</p>
        </div>
      </div>
    );
  }

  const { title, author, coverUrl, rating, profileUrl, shelf } = bookData;
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
          <StarRating rating={rating} />
        </div>
      </a>
    </div>
  );
};
