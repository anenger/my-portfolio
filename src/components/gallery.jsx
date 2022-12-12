import * as React from "react";

import {
  galleryDiv,
  galleryHeading,
  galleryImageDiv,
  galleryImages,
  galleryImage,
} from "./gallery.module.css";

const Gallery = ({ title }) => {
  return (
    <div className={galleryDiv}>
      <h2 className={galleryHeading}>{title}</h2>
      <div className={galleryImages}>
        {data.allFile.edges.map((file) => {
          let image = getImage(file.node);
          let alt = file.node.name;
          return <div className={galleryImageDiv}></div>;
        })}
      </div>
    </div>
  );
};

export default Gallery;
