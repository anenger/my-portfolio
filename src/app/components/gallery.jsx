"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import photo0 from "../../images/gallery/photo0.jpg";
import photo1 from "../../images/gallery/photo1.jpg";
import photo2 from "../../images/gallery/photo2.jpg";
import photo4 from "../../images/gallery/photo4.jpg";
import photo5 from "../../images/gallery/photo5.jpg";
import photo7 from "../../images/gallery/photo7.jpg";

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

const galleryImages = [
  { src: photo0, alt: "Gallery photo 0" },
  { src: photo1, alt: "Gallery photo 1" },
  { src: photo2, alt: "Gallery photo 2" },
  { src: photo4, alt: "Gallery photo 4" },
  { src: photo5, alt: "Gallery photo 5" },
  { src: photo7, alt: "Gallery photo 7" },
];

export const Gallery = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (galleryImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [resetKey]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1,
    );
    setResetKey((k) => k + 1);
  }, []);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    setResetKey((k) => k + 1);
  }, []);

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
          {galleryImages.map((image, index) => {
            const isVisible = index === currentIndex;
            const isFirst = index === 0;

            return (
              <Image
                key={image.alt}
                className={`${galleryImage} ${
                  isFirst ? galleryImageBase : galleryImageOverlay
                } ${isVisible ? galleryImageVisible : galleryImageHidden}`}
                src={image.src}
                alt={image.alt}
                priority={index === 0}
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
