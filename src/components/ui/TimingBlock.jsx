import React from "react";
import {  formatDuration } from "date-fns";
import { ru } from "date-fns/locale";

const TimingBlock = ({ className, duration }) => {

  const timeText = formatDuration(
    {
      hours: duration.hours,
      minutes: duration.minutes,
    },
    { locale: ru },

    { format: ["hours", "minutes"] }
  );


  return (
    <React.Fragment>
      <div className={className + "-timing"}>
        <span>{timeText}</span>
      </div>
    </React.Fragment>
  );
};

export default TimingBlock;