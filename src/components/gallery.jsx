import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import {
  galleryDiv,
  galleryHeading,
  galleryFlex,
  galleryImageDiv,
  galleryImages,
  galleryImage,
} from "./gallery.module.css";

const Gallery = ({ title, refProp }) => {
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
              gatsbyImageData(width: 650, aspectRatio: 1.5, quality: 75)
            }
          }
        }
      }
    }
  `);

  return (
    <div className={galleryDiv} ref={refProp}>
      <h2 className={galleryHeading}>{title}</h2>
      <div className={galleryFlex}>
        <div className={galleryImages}>
          {data.allFile.edges.map((file) => {
            let image = getImage(file.node);
            let alt = file.node.name;
            return (
              <div className={galleryImageDiv}>
                <GatsbyImage
                  className={galleryImage}
                  image={image}
                  alt={alt}
                ></GatsbyImage>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
