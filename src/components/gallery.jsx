import * as React from "react";
import { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
} from "./gallery.module.css";

const Gallery = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
              gatsbyImageData(width: 1000, quality: 85)
            }
          }
        }
      }
    }
  `);

  const images = data.allFile.edges;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={galleryDiv}>
      <h2 className={galleryHeading}>{title}</h2>
      <div className={galleryFlex}>
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
      </div>
    </div>
  );
};

export default Gallery;
