import React from "react";

const ReactRangeSlider = () => {
  const dispatch = useDispatch();
  const { price_from, price_to } = useSelector((state) => state.filter);

  const onChange = (value) => {
    dispatch(filterChange({ name: "price_from", value: value.min }));
    dispatch(filterChange({ name: "price_to", value: value.max }));
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};