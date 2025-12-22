import React from "react";
import WagonSeats from "./WagonSeats";

const Wagon = ({ data, num, className }) => {

    return (
      <React.Fragment>
        <div className={className + "_wagon-wrap"}>
          <div className={className + "_wagon-number"}>
            <span>{num}</span>
            <span className={className + "_wagon-number-text"}>вагон</span>
          </div>
          <WagonSeats
            className={className + "_wagon-seats-details"}
            data={data}
          />
        </div>
      </React.Fragment>
    );
  };

  export default Wagon;