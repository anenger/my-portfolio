import * as React from "react";

const TitleCard = ({ title, subtitle, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{description}</p>
    </div>
  );
};

export default TitleCard;
