import React, { useState } from "react";
import ContentBlock from "../../../Molecules/SelectionTrain/PriceContentBlock/ContentBlock";
import { formattedPrice } from "../../../../utils/trainSelectionUtils";

const AvailableWagons = ({ amount, type, className, min_price, item }) => {
  let currentPrice = item.min_price;

  let template;

  if (item.name === "fourth" || item.name === "first") {
    template = {
      amount: item.amount,
      seats: [{ name: "", price: item.min_price }],
    };
    currentPrice = item.min_price;
  } else {
    template = {
      amount: item.amount / 2,
      seats: [
        { name: "верхняя", price: item.top_price },
        { name: "нижняя", price: item.bottom_price },
      ],
    };
    currentPrice = item.name === "third"?item.side_price:item.top_price;
  
  }

  const [availableSeats, setAvailableSeats] = useState(false);
  const handleBoxToggle = () => {
    setAvailableSeats(!availableSeats);
  };

  return (
    <React.Fragment>
      <div
        className={
          "available-wagons_block-item d-flex wagons-" + className + "-class"
        }
        onMouseLeave={() => setAvailableSeats(false)}
      >
        <div className="available-seats_group-text">
          <span className="wagons_fourth_class-name wagons_type">{type}</span>
          <div
            className={
              "wagons_" + className + "-class amount-seats text-center"
            }
            onMouseEnter={handleBoxToggle}
          >
            {amount}
          </div>
        </div>
        <div className="wagons-type_price">
          <span className="text-min-price">от</span>
          <span className={"wagons-type_min-price"}>
            {formattedPrice(currentPrice)}
            <i
              className="fa fa-rub card-trains-menu-item-bottom-icon currency-icon "
              aria-hidden="true"
            ></i>
          </span>
        </div>

        {availableSeats ? (
          <ContentBlock className="available-seats" template={template} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default AvailableWagons;