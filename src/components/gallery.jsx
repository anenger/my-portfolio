import * as React from "react";

const Gallery = ({ title, images }) => {
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt={index}
              style={{ height: "100px", width: "100px" }}
            ></img>
          );
        })}
      </ul>
    </div>
  );
};

export default Gallery;
