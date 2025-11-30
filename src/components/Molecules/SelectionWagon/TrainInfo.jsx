import React from "react";
import { capitalizeFirstLetter } from "../../../utils/trainSelectionUtils";

const TrainInfo = ({ className, data }) => {

  if (!data || data === {}) {
    return;
  }
  return (
    <React.Fragment>
      <div className={className + " trail"}>
        <span className={className + " trains-number"}>106C</span>
        <div className="wrap">
          <span className="trail-city-name">
            {capitalizeFirstLetter(data.from.name)}
          </span>
          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
        <span className="trail-city-name d-block">
          {capitalizeFirstLetter(data.to.name)}
        </span>
        {data.from.trainName !== "" ? (
          <span className="train-name">{data.from.trainName}</span>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default TrainInfo;