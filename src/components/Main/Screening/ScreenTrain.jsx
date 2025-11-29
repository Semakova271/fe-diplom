import React from "react";
import { useSelector } from "react-redux";
import TrainsMenuCard from "../../Main/SelectionTrain/TrainsMenu/TrainsMenuCard";

const ScreenTrain = () => {
  const { seleсtedTrain } = useSelector((state) => state.catalogTrains);

  return (
    <React.Fragment>
      <div className="screening-block screening-block_train">
        <TrainsMenuCard departure={seleсtedTrain} />
      </div>
    </React.Fragment>
  );
};

export default ScreenTrain;