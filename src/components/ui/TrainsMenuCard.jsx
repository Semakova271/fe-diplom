import React from "react";
import AvailableWagons from "./AvailableVagons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import { CardTop, CardBody, CardBottom } from "./CardsModules";
import CardIconsBlock from "./CardIconsBlock";
import { Button, MySvgIcon } from "./Modules";
import TrainInfo from "./TrainInfo";
import TrailsData from "./TrailsData";
import icon_train from "../../img//ic_train.svg";
import icon_yellow_arrow_right from "../../img//ic_yellow-arrow-right.svg";
import { nanoid } from "nanoid";

const TrainsMenuCard = ({ departure, onClick }) => {
  
 if (!departure) {
  return null;
}

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let screen =
    location.pathname === `/fe-diplom/screening/${params.id}`
      ? "screen"
      : null;

  if (departure) params.id = departure._id;

  const dataTrain = {
    duration: departure.duration,
    statusWagons: [
      { name: "fourth", status: departure.have_fourth_class },
      { name: "third", status: departure.have_third_class },
      { name: "second", status: departure.have_second_class },
      { name: "first", status: departure.have_first_class },
    ],
    from: {
      trainName: departure.train.name,
      name: departure.from.city.name,
      datetime: departure.from.datetime,
      railway_station_name: departure.from.railway_station_name,
    },
    to: {
      name: departure.to.city.name,
      datetime: departure.to.datetime,
      railway_station_name: departure.to.railway_station_name,
    },
    train: departure.train,
    available_seats_info: departure.available_seats_info,
    price_info: departure.price_info,
  };

  const filteredWagons = dataTrain.statusWagons.filter(
    (item) => item.status === true
  );

  const dataWagons = filteredWagons.map((item) => {
    if (item.name === "fourth") {
      item.amount = departure.available_seats_info.fourth;
      item.min_price = departure.min_price;
      item.type = "Сидячий";
    }
    if (item.name === "third") {
      item.amount = departure.available_seats_info.third;
      item.min_price = departure.min_price;
      item.bottom_price = departure.price_info.third.bottom_price;
      item.side_price = departure.price_info.third.side_price;
      item.top_price = departure.price_info.third.top_price;
      item.type = "Плацкарт";
    }
    if (item.name === "second") {
      item.amount = departure.available_seats_info.second;
      item.min_price = departure.min_price;
      item.bottom_price = departure.price_info.second.bottom_price;
      item.top_price = departure.price_info.second.top_price;
      item.type = "Купе";
    }
    if (item.name === "first") {
      item.amount = departure.available_seats_info.first;
      item.min_price = departure.price_info.first.price;
      item.type = "Люкс";
    }

    return item;
  });

  const handleWagonSelect = (wagonType, wagonName) => {
    console.log(`Выбран ${wagonName} (${wagonType})`);
    if (params.id) {
      onClick(params.id, departure, wagonType);
    }
  };

  return (
    <Card key={departure._id} id={departure._id} className="trains-menu-item">
      <CardTop className="trains-menu-item">
        <MySvgIcon
          type={"trains-menu"}
          className={"trains-menu"}
          icon={icon_train}
        />
        <TrainInfo data={dataTrain} className="trains-menu" />
      </CardTop>
      <CardBody className="trains-menu-item">
        <TrailsData
          data={dataTrain}
          className="trains-menu"
          icon={icon_yellow_arrow_right}
        />
      </CardBody>
      <CardBottom className="trains-menu">
        <div className="trains-menu-available-wagons">
          {dataWagons.map((item) => (
            <AvailableWagons
              key={nanoid()}
              amount={item.amount}
              type={item.type}
              min_price={item.min_price}
              item={item}
              className="trains-menu_item"
              onSelect={handleWagonSelect}
            />
          ))}
        </div>
        <CardIconsBlock
          wifi={departure.have_wifi}
          express={departure.is_express}
        />
        {screen ? (
          <div className="screening-train_control">
            <Button
              text="Изменить"
              type="screening"
              onClick={() =>
                navigate({
                  pathname: `/fe-diplom/trains`,
                  search: location.search,
                })
              }
            ></Button>
          </div>
        ) : (
          <div className="trains-menu_control">
            <Button
              text="Выбрать места"
              type="selection-seats"
              onClick={params.id ? () => onClick(params.id, departure) : null}
            ></Button>
          </div>
        )}
      </CardBottom>
    </Card>
  );
};

export default TrainsMenuCard;