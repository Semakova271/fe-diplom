import React from "react";
import TimingBlock from "../../Molecules/SelectionWagon/WagonServices";
import TrainInfo from "../../Molecules/SelectionWagon/WagonServices";
import { MySvgIcon } from "../../BasicComponents/BasicComponents";
import { capitalizeFirstLetter } from "../../../utils/trainSelectionUtils";
import { format } from "date-fns";
import icon_clock from "../../../img/icon_clock.svg";
import icon_yellow_train from "../../../img/icon_yellow-train.svg";
import icon_yellow_arrow_right from "../../../img/icon_yellow-arrow-right.svg";

// Основной компонент карточки
export const Card = ({ id, className, children }) => {
  return (
    <div id={id} className={`${className}_card card`}>
      {children}
    </div>
  );
};

// Верхняя часть карточки
export const CardTop = ({ className, data, icon, children }) => {
  return (
    <div className={`card-top ${className}`}>
      {children || (
        <>
          <MySvgIcon
            type={className}
            className={className}
            icon={icon || icon_yellow_train}
          />
          <TrainInfo data={data} className={className} />
        </>
      )}
    </div>
  );
};

// Основная часть карточки
export const CardBody = ({ className, data, children }) => {
  const renderDefaultContent = () => (
    <div className={`${className}-group d-flex flex-row`}>
      <div className="train-departure-from d-flex flex-column">
        <span className="train-departure data-trains-datetime">
          {format(new Date(data.from.datetime), "HH:mm")}
        </span>
        <span className="train-departure data-trains-city-name">
          {capitalizeFirstLetter(data.from.name)}
        </span>
        <span className="train-departure data-trains-railway_station_name">
          {data.from.railway_station_name} вокзал
        </span>
      </div>
      
      <div className="d-flex flex-column justify-content-center trails-duration-block">
        <MySvgIcon 
          type={className} 
          className={className} 
          icon={icon_yellow_arrow_right} 
        />
      </div>
      
      <div className="train-departure-to d-flex flex-column">
        <span className="train-departure data-trains-datetime">
          {format(new Date(data.to.datetime), "HH:mm")}
        </span>
        <span className="train-departure data-trains-city-name">
          {capitalizeFirstLetter(data.to.name)}
        </span>
        <span className="train-departure data-trains-railway_station_name">
          {data.to.railway_station_name} вокзал
        </span>
      </div>
    </div>
  );

  return (
    <div className={`card-body ${className}`}>
      {children || renderDefaultContent()}
    </div>
  );
};

// Нижняя часть карточки
export const CardBottom = ({ className, data, children }) => {
  const renderDefaultContent = () => (
    <>
      <MySvgIcon type={className} className={className} icon={icon_clock} />
      <TimingBlock className={className} duration={data} />
    </>
  );

  return (
    <div className={`card-bottom ${className}_bottom`}>
      {children || renderDefaultContent()}
    </div>
  );
};

// Композитный экспорт для удобства
export default {
  Card,
  CardTop,
  CardBody,
  CardBottom
};