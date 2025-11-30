import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setTrainId,
  setSelectionTrain,
} from "../../../../features/catalogTrainsSlice";
import { clearDataSeats } from "../../../../features/catalogTrainsSlice";
import ContentBlock from "../../../Molecules/SelectionTrain/PriceContentBlock/PriceContent";
import { formattedPrice } from "../../../../utils/trainSelectionUtils";
import Card from "../../CardsBlock/CardBlock";
import { CardTop, CardBody, CardBottom } from "../../CardsBlock/CardBlock";
import { Button, MySvgIcon } from "../../../BasicComponents/BasicComponents";
import TrainInfo from "../../../Molecules/SelectionWagon/WagonServices";
import TrailsData from "../../../Molecules/SelectionTrain/TrailsData";
import icon_train from "../../../../img/icon_train.svg";
import icon_yellow_arrow_right from "../../../../img/icon_yellow-arrow-right.svg";
import { nanoid } from "nanoid";

/* ===== AVAILABLE WAGONS COMPONENT ===== */
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
    currentPrice = item.name === "third" ? item.side_price : item.top_price;
  }

  const [availableSeats, setAvailableSeats] = useState(false);

  const handleBoxToggle = () => {
    setAvailableSeats(!availableSeats);
  };

  return (
    <div
      className={`available-wagons_block-item d-flex wagons-${className}-class`}
      onMouseLeave={() => setAvailableSeats(false)}
    >
      <div className="available-seats_group-text">
        <span className="wagons_fourth_class-name wagons_type">{type}</span>
        <div
          className={`wagons_${className}-class amount-seats text-center`}
          onMouseEnter={handleBoxToggle}
        >
          {amount}
        </div>
      </div>
      <div className="wagons-type_price">
        <span className="text-min-price">от</span>
        <span className="wagons-type_min-price">
          {formattedPrice(currentPrice)}
          <i
            className="fa fa-rub card-trains-menu-item-bottom-icon currency-icon"
            aria-hidden="true"
          ></i>
        </span>
      </div>

      {availableSeats && <ContentBlock className="available-seats" template={template} />}
    </div>
  );
};

/* ===== PAGINATION COMPONENT ===== */
const PaginationTrainsMenu = ({ amount, limit }) => {
  return (
    <nav aria-label="..." className="nav-selection-trains-pagination">
      <ul className="pagination pagination-sm selection-trains-pagination">
        <li className="page-item disabled">
          <a className="page-link trains-menu-pagination__item-link" href="#item">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </a>
        </li>
        <li className="page-item active" aria-current="page">
          <a className="page-link trains-menu-pagination__item-link trains-menu-pagination_active-link" href="#item">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link trains-menu-pagination__item-link" href="#item">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link trains-menu-pagination__item-link" href="#item">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link trains-menu-pagination__item-link" href="#item">
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

/* ===== CARD ICONS COMPONENT ===== */
const CardIconsBlock = ({ wifi, express, className }) => {
  return (
    <div className={className || "card-trains-menu-item__icons-block text-right mr-2"}>
      {wifi && (
        <i className="fa fa-wifi card-icon_wifi ml-2" aria-hidden="true"></i>
      )}
      {express && (
        <img
          className="icon_rocket card-icon_rocket ml-2"
          src="https://cdn.onlinewebfonts.com/svg/download_535427.png"
          alt="icon rocket"
        />
      )}
      <i className="fa fa-coffee card-icon_coffee ml-2" aria-hidden="true"></i>
    </div>
  );
};

/* ===== TRAIN MENU CARD COMPONENT ===== */
const TrainsMenuCard = ({ departure, onClick }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const screen = location.pathname === `/fe-diplom/screening/${params.id}` ? "screen" : null;
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
    const wagonData = { ...item };
    
    switch (item.name) {
      case "fourth":
        wagonData.amount = departure.available_seats_info.fourth;
        wagonData.min_price = departure.min_price;
        wagonData.type = "Сидячий";
        break;
      case "third":
        wagonData.amount = departure.available_seats_info.third;
        wagonData.min_price = departure.min_price;
        wagonData.bottom_price = departure.price_info.third.bottom_price;
        wagonData.side_price = departure.price_info.third.side_price;
        wagonData.top_price = departure.price_info.third.top_price;
        wagonData.type = "Плацкарт";
        break;
      case "second":
        wagonData.amount = departure.available_seats_info.second;
        wagonData.min_price = departure.min_price;
        wagonData.bottom_price = departure.price_info.second.bottom_price;
        wagonData.top_price = departure.price_info.second.top_price;
        wagonData.type = "Купе";
        break;
      case "first":
        wagonData.amount = departure.available_seats_info.first;
        wagonData.min_price = departure.price_info.first.price;
        wagonData.type = "Люкс";
        break;
      default:
        break;
    }

    return wagonData;
  });

  return (
    <Card key={departure._id} id={departure._id} className="trains-menu-item">
      <CardTop className="trains-menu-item">
        <MySvgIcon
          type="trains-menu"
          className="trains-menu"
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
            />
          ))}
        </div>
        <CardIconsBlock
          wifi={departure.have_wifi}
          express={departure.is_express}
          className="trains-menu_icons-block"
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
            />
          </div>
        ) : (
          <div className="trains-menu_control">
            <Button
              text="Выбрать места"
              type="selection-seats"
              onClick={params.id ? () => onClick(params.id, departure) : null}
            />
          </div>
        )}
      </CardBottom>
    </Card>
  );
};

/* ===== MAIN TRAINS MENU COMPONENT ===== */
const TrainsMenu = ({ currentItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  if (!currentItems) {
    return null;
  }

  const clickHandler = (id, item) => {
    dispatch(clearDataSeats());
    dispatch(setTrainId({ id: item._id }));
    dispatch(setSelectionTrain({ data: item }));
    navigate({
      pathname: `/fe-diplom/seats/${item._id}`,
      search: location.search,
    });
  };

  return (
    <div className="card-deck trains-menu-group m-0">
      {currentItems && currentItems.length > 0
        ? currentItems.map((item) => (
            <TrainsMenuCard key={nanoid()} {...item} onClick={clickHandler} />
          ))
        : null}
    </div>
  );
};

export { AvailableWagons, PaginationTrainsMenu, CardIconsBlock, TrainsMenuCard, TrainsMenu };
export default TrainsMenu;