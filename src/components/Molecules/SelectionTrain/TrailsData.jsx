import React from "react";
import { MySvgIcon } from "../../Atoms/Atoms";
import {
  capitalizeFirstLetter,
  getDuration,
} from "../../../utils/trainSelectionUtils";
import { format } from "date-fns";
import { nanoid } from "nanoid";

const TrailsData = ({ className, data, icon, reverse = false }) => {
  const duration = getDuration(data.to.datetime, data.from.datetime);

  return (
    <React.Fragment>
      <div className={className + "-group d-flex flex-row"}>
        <div className={className + " train-departure-from d-flex flex-column"}>
          <span key={nanoid()} className="train-departure data-trains-datetime">
            {format(new Date(data.from.datetime * 1000), "HH:mm")}
          </span>
          <span
              key={nanoid()}
              className="train-departure data-trains-date"
            >
              {format(new Date(data.from.datetime * 1000), "dd.MM.yyyy")}
            </span>
          <span
            key={nanoid()}
            className="train-departure data-trains-city-name"
          >
            {capitalizeFirstLetter(data.from.name)}
          </span>
          <span className="train-departure data-trains-railway_station_name">
            {data.from.railway_station_name + " вокзал"}
          </span>
        </div>
        <div className={className + " trails-duration-block"}>
          <span className="trails-duration">
            {`${duration.hours} : ${duration.minutes}`}
          </span>
          <MySvgIcon
            type={className}
            className={className + "_top"}
            icon={icon}
          />
        </div>
        <div className={className + " train-departure-to d-flex flex-column"}>
          <span key={nanoid()} className="train-departure data-trains-datetime">
            {format(new Date(data.to.datetime * 1000), "HH:mm")}
          </span>
          <span
              key={nanoid()}
              className="train-departure data-trains-date"
            >
              {format(new Date(data.to.datetime * 1000), "dd.MM.yyyy")}
            </span>
          <span
            key={nanoid()}
            className="train-departure data-trains-city-name"
          >
            {capitalizeFirstLetter(data.to.name)}
          </span>
          <span className="train-departure data-trains-railway_station_name">
            {data.to.railway_station_name + " вокзал"}
          </span>
        </div>
      </div>
      {reverse ? (
        <div className={className + "-reverse-group d-flex flex-row"}>
          <div
            className={className + " train-departure-from d-flex flex-column"}
          >
            <span
              key={nanoid()}
              className="train-departure data-trains-datetime"
            >
              {format(new Date(data.to.datetime * 1000), "HH:mm")}
            </span>
          
            <span
              key={nanoid()}
              className="train-departure data-trains-city-name"
            >
              {capitalizeFirstLetter(data.to.name)}
            </span>
            <span className="train-departure data-trains-railway_station_name">
              {data.to.railway_station_name + " вокзал"}
            </span>
          </div>
          <div className={className + " trails-duration-block"}>
            <span className="trails-duration">
              {" "}
              {`${duration.hours}:${duration.minutes}`}
            </span>
            <MySvgIcon
              type={className}
              className={className + "-reverse"}
              icon={icon}
            />
          </div>
          <div className={className + " train-departure-to d-flex flex-column"}>
            <span
              key={nanoid()}
              className="train-departure data-trains-datetime"
            >
              {format(new Date(data.from.datetime * 1000), "HH:mm")}
            </span>
            <span
              key={nanoid()}
              className="train-departure data-trains-city-name"
            >
              {capitalizeFirstLetter(data.from.name)}
            </span>
            <span className="train-departure data-trains-railway_station_name">
              {data.from.railway_station_name + " вокзал"}
            </span>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default TrailsData;