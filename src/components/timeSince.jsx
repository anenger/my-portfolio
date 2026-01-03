import React, { useEffect, useState } from "react";

import { timeSinceDiv, timeSinceP } from "./timeSince.module.css";

const getTimeSince = (startTime) => {
  const start = new Date(startTime);
  const timeSince = Date.now() - start.getTime();
  return Math.floor(timeSince / 1000);
};

export const TimeSince = () => {
  const [timeSince, setTimeSince] = useState(0);

  useEffect(() => {
    setTimeSince(getTimeSince("1999-09-08T02:30:00"));
    const interval = setInterval(() => {
      setTimeSince(getTimeSince("1999-09-08T02:30:00"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={timeSinceDiv}>
      <p className={timeSinceP}>I'm approximately {timeSince} seconds old.</p>
    </div>
  );
};
