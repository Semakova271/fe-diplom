import React from "react";
import { useSelector } from "react-redux";
import { CardTitle } from "../Atoms/Atoms";
import RangeSlider from "./CustomSlider";

const Timing = ({ type }) => {
  const {
    start_departure_hour_from,
    start_departure_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  } = useSelector((state) => state.catalogTrains.searchData.trainsParameters);

  return (
    <React.Fragment>
      <div className={type + "_timing-block"}>
        <div className="time-start__wrap">
          <CardTitle text="Время отбытия" className={type + "_time-start"} />
          <RangeSlider
            min={0}
            max={24}
            height={10}
            step={1}
            type={"start_" + type}
            start={
              type === "departure"
                ? start_departure_hour_from
                : start_arrival_hour_from
            }
            end={
              type === "departure"
                ? start_departure_hour_to
                : start_arrival_hour_to
            }
          />
        </div>
        <div className="time-end__wrap">
          <CardTitle text="Время прибытия" className={type + "_time-end"} />
          <RangeSlider
            min={0}
            max={24}
            height={10}
            step={1}
            type={"end_" + type}
            start={
              type === "departure"
                ? end_departure_hour_from
                : end_arrival_hour_from
            }
            end={
              type === "departure" ? end_departure_hour_to : end_arrival_hour_to
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Timing;
