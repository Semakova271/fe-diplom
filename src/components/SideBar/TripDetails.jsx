import React from "react";
import { useSelector } from "react-redux";
import { CardBody } from "../Main/CardsBlock/CardsMolecules";
import TrailsData from "../Molecules/SelectionTrain/TrailsData";
import { capitalizeFirstLetter } from "../../utils/trainSelectionUtils";
import icon_yellow_arrow_right from "../../img/selectionTrain/icon_yellow-arrow-right.svg";
/**Кусок блока с данными поездки в сайдбаре OrderDetails */
const TripDetails = () => {
  const { seletedTrain } = useSelector((state) => state.catalogTrains);
  console.log(seletedTrain, "selectedTrain");
  const dataTrain = {
    duration: seletedTrain.duration,

    from: {
      trainName: seletedTrain.train.name,
      name: seletedTrain.from.city.name,
      datetime: seletedTrain.from.datetime,
      railway_station_name: seletedTrain.from.railway_station_name,
    },
    to: {
      name: seletedTrain.to.city.name,
      datetime: seletedTrain.to.datetime,
      railway_station_name: seletedTrain.to.railway_station_name,
    },
  };
  return (
    <React.Fragment>
      <div className="order-details">
        <div className="order-details_side-block_top">
          <div className="side-block_train-number">
            <span className="side-block_train-text">№ поезда</span>
            <span className="side-block_train-text strong-text">116С</span>
          </div>
          <div className="side-block_train-name">
            <span className="side-block_train-text">Название</span>
            <div className="side-block_text-name_wrap">
              <span className="side-block_train-text strong-text-name">
                {capitalizeFirstLetter(seletedTrain.from.city.name)}
              </span>
              <span className="side-block_train-text strong-text-name">
                {capitalizeFirstLetter(seletedTrain.to.city.name)}
              </span>
            </div>
          </div>
        </div>
        <CardBody className="order-details_side-block_body">
          <TrailsData
            className="order-details"
            data={dataTrain}
            parent={"order"}
            icon={icon_yellow_arrow_right}
          />
        </CardBody>
      </div>
    </React.Fragment>
  );
};

export default TripDetails;