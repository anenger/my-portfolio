import * as React from "react";

const AboutMe = ({ title, description, image }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      {image}
    </div>
  );
};

export default AboutMe;
