import React from "react";
import { MySvgIcon } from "../../BasicComponents/BasicComponents";
import {
  capitalizeFirstLetter,
  getDuration,
} from "../../../utils/trainSelectionUtils";
import { format } from "date-fns";

const RouteSegment = ({ from, to, duration, icon, className, isReverse }) => {
  const timeFormat = "HH:mm";
  const dateFormat = "dd.MM.yyyy";

  return (
    <div className={`${className}${isReverse ? "-reverse-group" : "-group"} d-flex flex-row`}>
      <div className={`${className} train-departure-from d-flex flex-column`}>
        <span className="train-departure data-trains-datetime">
          {format(new Date(from.datetime * 1000), timeFormat)}
        </span>
        <span className="train-departure data-trains-date">
          {format(new Date(from.datetime * 1000), dateFormat)}
        </span>
        <span className="train-departure data-trains-city-name">
          {capitalizeFirstLetter(from.name)}
        </span>
        <span className="train-departure data-trains-railway_station_name">
          {from.railway_station_name + " вокзал"}
        </span>
      </div>
      <div className={`${className} trails-duration-block`}>
        <span className="trails-duration">
          {`${duration.hours} : ${duration.minutes}`}
        </span>
        <MySvgIcon
          type={className}
          className={className + (isReverse ? "-reverse" : "_top")}
          icon={icon}
        />
      </div>
      <div className={`${className} train-departure-to d-flex flex-column`}>
        <span className="train-departure data-trains-datetime">
          {format(new Date(to.datetime * 1000), timeFormat)}
        </span>
        <span className="train-departure data-trains-date">
          {format(new Date(to.datetime * 1000), dateFormat)}
        </span>
        <span className="train-departure data-trains-city-name">
          {capitalizeFirstLetter(to.name)}
        </span>
        <span className="train-departure data-trains-railway_station_name">
          {to.railway_station_name + " вокзал"}
        </span>
      </div>
    </div>
  );
};

const TrailsData = ({ className, data, icon, reverse = false }) => {
  const duration = getDuration(data.to.datetime, data.from.datetime);

  return (
    <>
      <RouteSegment
        from={data.from}
        to={data.to}
        duration={duration}
        icon={icon}
        className={className}
        isReverse={false}
      />
      {reverse && (
        <RouteSegment
          from={data.to}
          to={data.from}
          duration={duration}
          icon={icon}
          className={className}
          isReverse={true}
        />
      )}
    </>
  );
};

export default TrailsData;