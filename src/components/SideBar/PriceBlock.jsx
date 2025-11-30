import React from "react";
import { useSelector } from "react-redux";
import RangeSlider from "./CustomSlider";
import { CardTitle } from "../Atoms/Atoms";

const PriceBlock = () => {
  const { price_from, price_to } = useSelector(
    (state) => state.catalogTrains.searchData.trainsParameters
  );

  return (
    <React.Fragment>
      <div className="sidebar-price-block">
        <CardTitle text={"Стоимость"} className="sidebar-price-block" />
        <div className="sidebar-price-block_description">
          <span className="sidebar-price-block_text">от</span>
          <span className="sidebar-price-block_text">до</span>
        </div>
        <RangeSlider
          min={500}
          max={9000}
          height={19}
          step={100}
          type={"price"}
          start={price_from}
          end={price_to}
        />
      </div>
    </React.Fragment>
  );
};

export default PriceBlock;
