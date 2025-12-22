import React from "react";
import { MySvgIcon } from "./Modules";
import {
  capitalizeFirstLetter,
  getDuration,
} from "../../utils/trainSelectionUtils";
import { format } from "date-fns";
import { nanoid } from "nanoid";

const TrailsData = ({ className, data, icon, reverse = false }) => {
  const duration = getDuration(data.to.datetime, data.from.datetime);

  return (
    <React.Fragment>
      <div className={`${className}-container d-flex`}>
        <div className={`${className}-content d-flex`}>
          {/* Блок отправления */}
          <div className={`${className} train-departure-from d-flex flex-column`}>
            <div className="datetime-block">
              <span key={nanoid()} className="train-departure data-trains-datetime">
                {format(new Date(data.from.datetime * 1000), "HH:mm")}
              </span>
              <span key={nanoid()} className="train-departure data-trains-date">
                {format(new Date(data.from.datetime * 1000), "dd.MM.yyyy")}
              </span>
            </div>
            <span key={nanoid()} className="train-departure data-trains-city-name">
              {capitalizeFirstLetter(data.from.name)}
            </span>
            <span className="train-departure data-trains-railway_station_name">
              {data.from.railway_station_name} вокзал
            </span>
          </div>
          
          {/* Центральный блок с длительностью и стрелкой */}
          <div className={`${className} trails-duration-block`}>
            <MySvgIcon
              type={className}
              className={`${className}_arrow`}
              icon={icon}
            />
            <span className="trails-duration">
              {`${duration.hours} : ${duration.minutes}`}
            </span>
          </div>
          
          {/* Блок прибытия */}
          <div className={`${className} train-departure-to d-flex flex-column`}>
            <div className="datetime-block">
              <span key={nanoid()} className="train-departure data-trains-datetime">
                {format(new Date(data.to.datetime * 1000), "HH:mm")}
              </span>
              <span key={nanoid()} className="train-departure data-trains-date">
                {format(new Date(data.to.datetime * 1000), "dd.MM.yyyy")}
              </span>
            </div>
            <span key={nanoid()} className="train-departure data-trains-city-name">
              {capitalizeFirstLetter(data.to.name)}
            </span>
            <span className="train-departure data-trains-railway_station_name">
              {data.to.railway_station_name} вокзал
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrailsData;