import React from "react";
import TimingBlock from "../../Molecules/SelectionWagon/TimingBlock";
import TrainInfo from "../../Molecules/SelectionWagon/TrainInfo";
import { MySvgIcon } from "../../Atoms/Atoms";
import { capitalizeFirstLetter } from "../../../utils/trainSelectionUtils";
import { format} from "date-fns";
import { nanoid } from "nanoid";
import icon_clock from "../../../img/selectionTrain/icon_clock.svg";
import icon_yellow_train from "../../../img/selectionTrain/icon_yellow-train.svg";
import icon_yellow_arrow_right from "../../../img/selectionTrain/icon_yellow-arrow-right.svg";

export const CardTop = ({ className, data, icon, children }) => {

    return (
      <React.Fragment>
        <div key={nanoid()} className={"card-top "+ className}>
        {children?null: <MySvgIcon
            type={className}
            className={className}
            icon={icon? icon:icon_yellow_train}
          />}
          {children? children:<TrainInfo data={data} className={className}/>}
        </div>
      </React.Fragment>
    );
  };

  export const CardBody = ({ className, data, children }) => {

    return (
      <React.Fragment>
        <div key={nanoid()} className={"card-body " + className}>
          {children? children:
          <div className={className + "-group d-flex flex-row"}>
            <div className="train-departure-from d-flex flex-column">
              <span
                key={nanoid()}
                className="train-departure data-trains-datetime"
              >
                {format(new Date(data.from.datetime), "HH:mm")}
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
            <div className=" d-flex flex-column justify-content-center trails-duration-block ">
              <MySvgIcon  type={className} className={className} icon={icon_yellow_arrow_right} />
            </div>
            <div className="train-departure-to d-flex flex-column">
              <span
                key={nanoid()}
                className="train-departure data-trains-datetime"
              >
                {format(new Date(data.to.datetime), "HH:mm")}
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
          </div>}
        </div>
      </React.Fragment>
    );
  };
  
  export const CardBottom = ({ className, data, children }) => {
    return (
      <React.Fragment>
        <div className={"card-bottom " + className + "_bottom"}>
          {children? null:<MySvgIcon  type={className} className={className} icon={icon_clock} />}
           {children? null:<TimingBlock className={className} duration={data} />}
           {children? children:null}
        </div>
      </React.Fragment>
    );
  };