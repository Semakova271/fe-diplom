import React from "react";
import WagonDetailsTable from "./WagonDetailsTable";
import WagonServices from "./WagonServices";
const WagonSeats = ({ className, data }) => {

  let bottomSeats = [];
  let topSeats = [];

  data.seats.forEach((item) => {
    return item.index % 2 === 0 ? bottomSeats.push(item) : topSeats.push(item);
  });

  const dataWagons = {
    seats: data.seats,
    topSeats,
    bottomSeats,
    top_price: data.coach.top_price,
    bottom_price: data.coach.bottom_price,
  };

  return (
    <React.Fragment>
      <div className={className + "_wrap"}>
        <WagonDetailsTable
          data={dataWagons}
          classType={data.coach.class_type}
        />
        <WagonServices className={className} data={data.coach} />
      </div>
    </React.Fragment>
  );
};

export default WagonSeats;