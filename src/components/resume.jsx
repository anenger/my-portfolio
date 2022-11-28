import * as React from "react";

const Resume = ({ jobs, descriptions }) => {
  return (
    <div>
      <h1>Where I've Worked</h1>
      <ul>
        {jobs.map((job, index) => {
          return (
            <li key={index}>
              <h3>{job}</h3>
              <p>{descriptions[index]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Resume;
