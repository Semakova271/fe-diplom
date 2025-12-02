import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { filterChange } from "../../features/catalogTrainsSlice";

const ReactRangeSlider = () => {
  const dispatch = useDispatch();
  const { price_from, price_to } = useSelector((state) => state.catalogTrains.filter);

  const onChange = (value) => {
    dispatch(filterChange({ name: "price_from", value: value.min }));
    dispatch(filterChange({ name: "price_to", value: value.max }));
  };

  return (
    <InputRange
      id="slider"
      minValue={1920}
      maxValue={9000}
      step={10}
      onChange={onChange}
      value={{
        min: price_from,
        max: price_to,
      }}
    />
  );
};

export default ReactRangeSlider;