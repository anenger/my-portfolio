import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import {
  galleryDiv,
  galleryHeading,
  galleryImageDiv,
  galleryImages,
  galleryImage,
} from "./gallery.module.css";

const Gallery = ({ title }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { eq: "jpg" }
          relativeDirectory: { eq: "gallery" }
        }
      ) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `);
  return (
    <div className={galleryDiv}>
      <h2 className={galleryHeading}>{title}</h2>
      <div className={galleryImages}>
        {data.allFile.edges.map((image, index) => {
          return (
            <div className={galleryImageDiv}>
              <img
                className={galleryImage}
                src={image.node.publicURL}
                alt={index}
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
