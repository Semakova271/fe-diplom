import React from "react";

import CardIconsBlock from "../Main/SelectionTrain/TrainsMenu/CardIconsBlock";
import { nanoid } from "nanoid";
import { CardTitle } from "../Atoms/Atoms";
import { capitalizeFirstLetter, formattedPrice } from "../../utils/trainSelectionUtils";

const LastTickets = ({data}) => {

  return (
    <React.Fragment>
      <div className="last-tickets-block">
        <CardTitle text="Последние билеты" className={"last-tickets"} />
        <div className="card-deck last-tickets-menu-group no-gutters">
          {data && data.map((item) => <Card key={nanoid()} {...item} />)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LastTickets;

const Card = (item) => {
  return (
    <React.Fragment>
      <div key={nanoid()} className="card last-tickets-menu-item">
        <div className="card-body p-0 last-tickets__card">
          <div className="  last-tickets_train-departure-from d-flex flex-column">
            <span
              key={nanoid()}
              className="last-tickets_train-departure data-trains-city-name"
            >
              {capitalizeFirstLetter( item.departure.from.city.name)}
            </span>
            <span className="last-tickets_train-departure data-trains-railway_station_name">
              {item.departure.from.railway_station_name + " вокзал"}
            </span>
          </div>
          <div className="  last-tickets_train-departure-from d-flex flex-column align-items-end text-right">
            <span
              key={nanoid()}
              className="last-tickets_train-departure-to data-trains-city-name"
            >
              {capitalizeFirstLetter (item.departure.to.city.name)}
            </span>
            <span className="last-tickets_train-departure-to data-trains-railway_station_name">
              {item.departure.to.railway_station_name + " вокзал"}
            </span>
          </div>
        </div>
        <div className="card-bottom last-tickets__card">
          <CardIconsBlock
            key={nanoid()}
            wifi={item.departure.have_wifi}
            express={item.departure.is_express}
            className={"trains-menu_icons-block"}
          />
          <div className="last-tickets__card-price">
            <span className="text-min-price">от</span>
            <span className={"last-tickets__card_min-price"}>
              {formattedPrice(item.min_price)}
            </span>
            <i
              className="fa fa-rub last-tickets__card_bottom-icon currency-icon "
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};


