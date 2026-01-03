import * as React from "react";
import { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import {
  galleryDiv,
  galleryHeading,
  galleryFlex,
  galleryImageContainer,
  galleryImage,
  galleryImageBase,
  galleryImageOverlay,
  galleryImageVisible,
  galleryImageHidden,
  galleryArrow,
  galleryArrowLeft,
  galleryArrowRight,
} from "./gallery.module.css";

const Gallery = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { eq: "jpg" }
          relativeDirectory: { eq: "gallery" }
        }
        sort: { name: ASC }
      ) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 1000, aspectRatio: 1.5, quality: 85)
            }
          }
        }
      }
    }
  `);

  const images = data.allFile.edges;

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, resetKey]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setResetKey((k) => k + 1);
  }, [images.length]);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setResetKey((k) => k + 1);
  }, [images.length]);

  return (
    <div className={galleryDiv}>
      <h2 className={galleryHeading}>{title}</h2>
      <div className={galleryFlex}>
        <button
          className={`${galleryArrow} ${galleryArrowLeft}`}
          onClick={goToPrev}
          aria-label="Previous image"
        >
          <IoChevronBack />
        </button>
        <div className={galleryImageContainer}>
          {images.map((file, index) => {
            const image = getImage(file.node);
            const alt = file.node.name;
            const isVisible = index === currentIndex;
            const isFirst = index === 0;

            return (
              <GatsbyImage
                key={file.node.name}
                className={`${galleryImage} ${
                  isFirst ? galleryImageBase : galleryImageOverlay
                } ${isVisible ? galleryImageVisible : galleryImageHidden}`}
                image={image}
                alt={alt}
              />
            );
          })}
        </div>
        <button
          className={`${galleryArrow} ${galleryArrowRight}`}
          onClick={goToNext}
          aria-label="Next image"
        >
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
