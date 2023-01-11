import React, { useEffect, useState } from "react";

import { timeSinceDiv, timeSinceP } from "./timeSince.module.css";

const TimeSince = () => {
  const [timeSince, setTimeSince] = useState(0);

  useEffect(() => {
    const start = new Date("1999-09-08T02:30:00");
    const now = new Date();
    const timeSinceStart = now.getTime() - start.getTime();
    setTimeSince(Math.floor(timeSinceStart / 1000));

    // set an interval to update the time every second
    const interval = setInterval(() => {
      const now = new Date();
      const timeSinceStart = now.getTime() - start.getTime();
      setTimeSince(Math.floor(timeSinceStart / 1000));
    }, 1000);

    // Clear interval when component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={timeSinceDiv}>
      <p className={timeSinceP}>I'm approximately {timeSince} seconds old.</p>
    </div>
  );
};

export default TimeSince;
