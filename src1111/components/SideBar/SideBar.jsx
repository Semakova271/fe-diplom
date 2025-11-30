// Sidebar.jsx - объединенный файл со всеми компонентами сайдбара
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useDebouncedCallback } from "use-debounce";
import { nanoid } from "nanoid";

// Импорты утилит и экшенов
import { 
  parsedUrlString, 
  getUrlSearch, 
  capitalizeFirstLetter, 
  formattedPrice 
} from "../../utils/trainSelectionUtils";
import { getDataPassTemplate } from "../../utils/WagonSelectionUtils";
import { setTrainsParameters } from "../../features/catalogTrainsSlice";
import { useGetLastTicketsQuery } from "../../features/myApi";

// Импорты компонентов
import FormSideBar from "../Forms/Forms";
import CardIconsBlock from "../Main/SelectionTrain/TrainsMenu/TrainsMenu";
import TrailsData from "../Molecules/SelectionTrain/TrailsData";
import Tooltip from "../Molecules/Molecules/Moleculescomponent";
import CustomSwitch from "../Molecules/MUI/components";
import { CardTitle, MySvgIcon, Button, Title } from "../BasicComponents/BasicComponents";
import { CardBody } from "../Main/CardsBlock/CardBlock";

// Импорты иконок
import icon_arrow from "../../img/icon_arrow.svg";
import icon_pass_yellow from "../../img/icon_pass_yellow.svg";
import icon_yellow_arrow_right from "../../img/icon_yellow-arrow-right.svg";
import icon_second_class from "../../img/icon_second_class.svg";
import icon_fourth_class from "../../img/icon_fourth_class.svg";
import icon_third_class from "../../img/icon_third_class.svg";
import icon_rocket from "../../img/icon_rocket.svg";
import icon_star from "../../img/icon_star.svg";
import icon_wifi from "../../img/icon_wifi.svg";

// ==================== STYLED COMPONENTS ====================
const SidebarContainer = styled('aside')({
  marginLeft: '259px',
  marginTop: '95px',
  marginRight: 0,
  width: '360px',
  fontFamily: '"Roboto"',
  fontStyle: 'normal',
  fontWeight: 400,
});

const BlockWrapper = styled('div')({
  background: '#3e3c41',
});

const FormSidebarBlock = styled('div')({
  height: '280px',
  padding: '43px 36px 33px 28px',
  borderBottom: '1px solid #e5e5e5',
  '&.arrival': {
    marginTop: '28px',
  },
});

const SwitchBlockContainer = styled('div')({
  paddingTop: '32px',
  paddingBottom: '21px',
});

const SwitchItem = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  height: '21px',
  marginBottom: '35px',
  '&:last-child': {
    marginBottom: 0,
  },
});

const PriceBlockContainer = styled('div')({
  borderTop: '1px solid #e5e5e5',
  padding: '37px 30px 32px 34px',
});

const PriceDescription = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: 0,
  marginBottom: '5px',
  height: '23px',
  fontFamily: '"Roboto"',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '21px',
  color: '#ffffff',
});

const SideBlockContainer = styled('div')({
  fontFamily: '"Roboto"',
  fontStyle: 'normal',
  width: '360px',
  borderTop: '1px solid #e5e5e5',
  '&.departure': {
    marginTop: '27px',
  },
  '&.arrival': {
    minHeight: '94px',
  },
});

const SideBlockHeader = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  margin: '27px 34px 25px 32px',
  fontWeight: 700,
  fontSize: '30px',
  lineHeight: '35px',
  color: '#ffffff',
});

const SideBlockButton = styled('button')({
  padding: 0,
  width: '20px',
  height: '20px',
  color: '#fff',
  border: '2px solid #ffffff',
  borderRadius: '5px',
  lineHeight: 0,
  background: 'transparent',
  cursor: 'pointer',
});

const TimingBlock = styled('div')({
  paddingBottom: '14px',
  '& .time-end__wrap': {
    marginTop: '45px',
    height: '140px',
  },
  '& .time-start__wrap': {
    height: '78px',
  },
});

// ИСПРАВЛЕНИЕ: Переименовываем styled component чтобы избежать конфликта имен
const LastTicketsCardContainer = styled('div')({
  display: 'flex',
  padding: '18px',
  borderRadius: 0,
  marginBottom: '17px',
  border: '1px solid #c4c4c4',
  boxShadow: '0px 2px 2px rgb(62 60 65 / 25%)',
});

const LastTicketsContainer = styled('div')({
  width: '360px',
  marginTop: '94px',
});

const OrderDetailsWrapper = styled('div')({
  width: '360px',
  marginBottom: '40px',
  background: '#3e3c41',
});

const OrderDetailsHeader = styled('div')({
  height: '108px',
  padding: '35px 44px 30px 43px',
});

const OrderDetailsFooter = styled('div')({
  borderTop: '1px solid #e5e5e5',
  padding: '30px 27px 34px 28px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
});

const PassengersBlock = styled('div')({
  minHeight: '109px',
  borderTop: '1px solid #e5e5e5',
});

const PassengersHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  padding: '19px 27px 33px 29px',
});

const TicketsBlock = styled('div')({
  paddingLeft: '28px',
  paddingRight: '27px',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '21px',
  color: '#e5e5e5',
});

const TicketItem = styled('div')({
  display: 'flex',
  flexFlow: 'row',
  marginBottom: '22px',
});

const TripDetailsTop = styled('div')({
  paddingLeft: '28px',
  paddingRight: '27px',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '21px',
  color: '#e5e5e5',
});

// ==================== КОМПОНЕНТЫ ====================

// CustomSlider Component
const StyledSlider = styled(Slider)(({ height = 10 }) => ({
  color: "#FFA800",
  height: height,
  padding: 0,
  marginBottom: "5px",
  width: 294,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    marginLeft: "8px",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 0 0 8px rgba(255, 168, 0, .1)",
    },
  },
  "& .MuiSlider-track": {
    height: height,
    marginLeft: "8px",
  },
  "& .MuiSlider-rail": {
    color: "#3E3C41",
    border: "1px solid #C4C4C4",
    opacity: 1,
    height: height,
  },
  "& .MuiSlider-markLabel": {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "21px",
    color: "#FFFFFF",
  },
}));

const RangeSlider = ({ min, max, step, height, type, start, end }) => {
  const [value, setValue] = useState([start, end]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const debouncedValue = useDebouncedCallback((value) => {
    setValue(value);
    let upData = parsedUrlString(location.search);
    let template;

    const typeMappings = {
      price: {
        name: "price",
        params: ['price_from', 'price_to']
      },
      start_departure: {
        name: "start_departure", 
        params: ['start_departure_hour_from', 'start_departure_hour_to']
      },
      start_arrival: {
        name: "start_arrival",
        params: ['start_arrival_hour_from', 'start_arrival_hour_to']
      },
      end_departure: {
        name: "end_departure",
        params: ['end_departure_hour_from', 'end_departure_hour_to']
      },
      end_arrival: {
        name: "end_arrival",
        params: ['end_arrival_hour_from', 'end_arrival_hour_to']
      }
    };

    const mapping = typeMappings[type];
    if (mapping) {
      template = {
        name: mapping.name,
        value: {
          [mapping.params[0]]: value[0],
          [mapping.params[1]]: value[1]
        }
      };
      upData.parameters[mapping.params[0]] = value[0];
      upData.parameters[mapping.params[1]] = value[1];
    }

    if (template) {
      dispatch(setTrainsParameters({ data: template }));
      const urlSearchString = getUrlSearch(
        upData.optionsName,
        upData.formData,
        upData.filter,
        upData.parameters
      );
      navigate({
        search: `${urlSearchString}`,
      });
    }
  }, 2000);

  useEffect(() => {
    debouncedValue(value);
  }, [debouncedValue, value]);

  const handleChange = (event, newValue) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  const marks = [
    {
      value: min,
      label: type === "price" ? min.toString() : min + ":00",
    },
    {
      value: max,
      label: type === "price" ? max.toString() : max + ":00",
    },
  ];

  return (
    <Box sx={{ width: 294, marginLeft: type === "price" ? 0 : "30px", height }}>
      <StyledSlider
        value={value}
        height={height}
        min={min}
        max={max}
        step={step}
        marks={marks}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => `${value}`}
      />
    </Box>
  );
};

// TripDetails Component
const TripDetails = () => {
  const { selectedTrain } = useSelector((state) => state.catalogTrains);
  
  if (!selectedTrain) return null;

  const dataTrain = {
    duration: selectedTrain.duration,
    from: {
      trainName: selectedTrain.train.name,
      name: selectedTrain.from.city.name,
      datetime: selectedTrain.from.datetime,
      railway_station_name: selectedTrain.from.railway_station_name,
    },
    to: {
      name: selectedTrain.to.city.name,
      datetime: selectedTrain.to.datetime,
      railway_station_name: selectedTrain.to.railway_station_name,
    },
  };

  return (
    <div className="order-details">
      <TripDetailsTop>
        <div className="side-block_train-number">
          <span className="side-block_train-text">№ поезда</span>
          <span className="side-block_train-text strong-text">116С</span>
        </div>
        <div className="side-block_train-name">
          <span className="side-block_train-text">Название</span>
          <div className="side-block_text-name_wrap">
            <span className="side-block_train-text strong-text-name">
              {capitalizeFirstLetter(selectedTrain.from.city.name)}
            </span>
            <span className="side-block_train-text strong-text-name">
              {capitalizeFirstLetter(selectedTrain.to.city.name)}
            </span>
          </div>
        </div>
      </TripDetailsTop>
      <CardBody className="order-details_side-block_body">
        <TrailsData
          className="order-details"
          data={dataTrain}
          parent={"order"}
          icon={icon_yellow_arrow_right}
        />
      </CardBody>
    </div>
  );
};

// Timing Component
const Timing = ({ type }) => {
  const {
    start_departure_hour_from,
    start_departure_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  } = useSelector((state) => state.catalogTrains.searchData.trainsParameters);

  const getStartValue = () => 
    type === "departure" ? start_departure_hour_from : start_arrival_hour_from;
  
  const getStartEnd = () =>
    type === "departure" ? start_departure_hour_to : start_arrival_hour_to;

  const getEndValue = () =>
    type === "departure" ? end_departure_hour_from : end_arrival_hour_from;

  const getEndEnd = () =>
    type === "departure" ? end_departure_hour_to : end_arrival_hour_to;

  return (
    <TimingBlock className={type + "_timing-block"}>
      <div className="time-start__wrap">
        <CardTitle text="Время отбытия" className={type + "_time-start"} />
        <RangeSlider
          min={0}
          max={24}
          height={10}
          step={1}
          type={"start_" + type}
          start={getStartValue()}
          end={getStartEnd()}
        />
      </div>
      <div className="time-end__wrap">
        <CardTitle text="Время прибытия" className={type + "_time-end"} />
        <RangeSlider
          min={0}
          max={24}
          height={10}
          step={1}
          type={"end_" + type}
          start={getEndValue()}
          end={getEndEnd()}
        />
      </div>
    </TimingBlock>
  );
};

// SideBlock Component
const SideBlock = ({ type, data, date, side, children, parent, onChange }) => {
  const [showTiming, setShowTiming] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const basedClasses = type === "departure" ? "departure" : "arrival";

  useEffect(() => {
    if (date) setShowTooltip(false);
  }, [date]);

  const clickHandler = () => {
    if (date) {
      setShowTiming(!showTiming);
    } else {
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <SideBlockContainer className={"sidebar-side-block " + basedClasses}>
      <SideBlockHeader>
        {showTooltip && (
          <Tooltip
            name={"side_block_" + type}
            text={"Выберите дату " + (side === "start" ? "отправления" : "возвращения")}
          />
        )}
        <MySvgIcon
          type="sidebar-side-block"
          icon={icon_arrow}
          className={basedClasses + "_arrow"}
        />
        <CardTitle
          text={type === "departure" ? "Туда" : "Обратно"}
          className="sidebar-side-block"
        />
        {date && (
          <span className="sidebar-side-block_date">{date}</span>
        )}
        <SideBlockButton type="sidebar-side-block" onClick={clickHandler}>
          {showTiming ? (
            <i className="fa fa-minus" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-plus" aria-hidden="true"></i>
          )}
        </SideBlockButton>
      </SideBlockHeader>
      {showTiming && !parent && (
        <Timing type={type} onChangeHandler={onChange} />
      )}
      {showTiming && parent && <TripDetails />}
      {children}
    </SideBlockContainer>
  );
};

// SwitchBlock Component
const SwitchBlock = ({ handleChange }) => {
  const { trainsParameters } = useSelector(
    (state) => state.catalogTrains.searchData
  );

  const switchItems = [
    { icon: icon_second_class, name: "second", label: "Купе", checked: trainsParameters.have_second_class },
    { icon: icon_third_class, name: "third", label: "Плацкарт", checked: trainsParameters.have_third_class },
    { icon: icon_fourth_class, name: "fourth", label: "Сидячий", checked: trainsParameters.have_fourth_class },
    { icon: icon_star, name: "first", label: "Люкс", checked: trainsParameters.have_first_class },
    { icon: icon_wifi, name: "wifi", label: "Wi-Fi", checked: trainsParameters.have_wifi },
    { icon: icon_rocket, name: "express", label: "Экспресс", checked: trainsParameters.have_express },
  ];

  return (
    <SwitchBlockContainer>
      <FormGroup>
        {switchItems.map((item) => (
          <SwitchItem key={item.name}>
            <MySvgIcon
              type={"sidebar-switchbox"}
              icon={item.icon}
              className={item.name + "-class"}
            />
            <FormControlLabel
              control={<CustomSwitch />}
              labelPlacement="start"
              onChange={handleChange}
              name={item.name}
              label={item.label}
              checked={item.checked}
            />
          </SwitchItem>
        ))}
      </FormGroup>
    </SwitchBlockContainer>
  );
};

// PriceBlock Component
const PriceBlock = () => {
  const { price_from, price_to } = useSelector(
    (state) => state.catalogTrains.searchData.trainsParameters
  );

  return (
    <PriceBlockContainer>
      <CardTitle text={"Стоимость"} className="sidebar-price-block" />
      <PriceDescription>
        <span className="sidebar-price-block_text">от</span>
        <span className="sidebar-price-block_text">до</span>
      </PriceDescription>
      <RangeSlider
        min={500}
        max={9000}
        height={19}
        step={100}
        type={"price"}
        start={price_from}
        end={price_to}
      />
    </PriceBlockContainer>
  );
};

// QuantityPassBlock Component
const QuantityPassBlock = ({ data }) => {
  const [showPassengers, setShowPassengers] = useState(true);

  const clickHandler = () => {
    setShowPassengers(!showPassengers);
  };

  const resultTemplate = getDataPassTemplate(data);

  return (
    <PassengersBlock>
      <PassengersHeader>
        <MySvgIcon
          type="order-details_passengers"
          icon={icon_pass_yellow}
          className={"icon_pass"}
        />
        <CardTitle className="order-details_passengers" text="Пассажиры" />
        <SideBlockButton type="order-details_passengers" onClick={clickHandler}>
          {showPassengers ? (
            <i className="fa fa-minus" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-plus" aria-hidden="true"></i>
          )}
        </SideBlockButton>
      </PassengersHeader>
      {showPassengers && (
        <TicketsBlock>
          {resultTemplate.length > 0 ? (
            resultTemplate.map((item) => (
              <TicketItem key={nanoid()}>
                <span className="data-ticket_count-text">{item.count}</span>
                <span className="data-ticket_type-text">{item.text}</span>
                <span className="data-ticket_price-text">
                  {formattedPrice(item.price)}
                </span>
                <svg
                  className="data-ticket_price-currency-icon"
                  width="14"
                  height="17"
                  viewBox="0 0 14 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.50039 10.2043C3.50039 10.7755 3.50039 11.3354 3.50039 11.9021C4.95655 11.9021 6.40805 11.9021 7.86655 11.9021C7.86655 12.471 7.86655 13.0332 7.86655 13.6044C6.41272 13.6044 4.95889 13.6044 3.50039 13.6044C3.50039 14.7401 3.50039 15.8666 3.50039 17C2.91466 17 2.33593 17 1.74786 17C1.74786 15.8712 1.74786 14.7423 1.74786 13.6089C1.16213 13.6089 0.585732 13.6089 0.00233359 13.6089C0.00233359 13.04 0.00233359 12.4778 0.00233359 11.9066C0.581065 11.9066 1.1598 11.9066 1.74086 11.9066C1.74086 11.3377 1.74086 10.7778 1.74086 10.2088C1.16213 10.2088 0.583399 10.2088 0 10.2088C0 9.6376 0 9.07545 0 8.50649C0.578731 8.50649 1.15746 8.50649 1.7432 8.50649C1.7432 5.67079 1.7432 2.84189 1.7432 0.00845521C1.7782 0.00618846 1.80154 0.00392171 1.8272 0.00392171C4.1608 0.00392171 6.49439 -0.00741203 8.82799 0.00845521C10.1745 0.0175222 11.3459 0.495806 12.3307 1.3889C13.1568 2.13693 13.6889 3.0527 13.8989 4.13167C14.1906 5.63452 13.8499 7.00591 12.8931 8.22088C12.2374 9.05505 11.3809 9.6308 10.3542 9.95948C9.85244 10.1204 9.33671 10.2043 8.80932 10.2043C7.07546 10.2066 5.34393 10.2043 3.61007 10.2066C3.57507 10.2043 3.54006 10.2043 3.50039 10.2043ZM3.50273 1.70398C3.50273 3.97753 3.50273 6.23975 3.50273 8.50423C3.52839 8.50423 3.5494 8.50423 3.5704 8.50423C5.3206 8.50423 7.07079 8.50876 8.82099 8.49969C9.09168 8.49743 9.36938 8.45889 9.63074 8.39316C11.4813 7.91714 12.5804 6.14908 12.1604 4.34248C11.801 2.80109 10.3868 1.70398 8.75798 1.70398C7.04279 1.70398 5.3276 1.70398 3.6124 1.70398C3.5774 1.70398 3.5424 1.70398 3.50273 1.70398Z"
                    fill="#928F94"
                  />
                </svg>
              </TicketItem>
            ))
          ) : (
            <TicketItem>
              <span className="data-ticket_count-text">
                Выберите места в вагоне и пассажиров!
              </span>
            </TicketItem>
          )}
        </TicketsBlock>
      )}
    </PassengersBlock>
  );
};

// ИСПРАВЛЕНИЕ: Переименовываем компонент чтобы избежать конфликта
const LastTicketsItem = ({ item }) => {
  return (
    <LastTicketsCardContainer>
      <div className="card-body p-0 last-tickets__card">
        <div className="last-tickets_train-departure-from d-flex flex-column">
          <span className="last-tickets_train-departure data-trains-city-name">
            {capitalizeFirstLetter(item.departure.from.city.name)}
          </span>
          <span className="last-tickets_train-departure data-trains-railway_station_name">
            {item.departure.from.railway_station_name + " вокзал"}
          </span>
        </div>
        <div className="last-tickets_train-departure-from d-flex flex-column align-items-end text-right">
          <span className="last-tickets_train-departure-to data-trains-city-name">
            {capitalizeFirstLetter(item.departure.to.city.name)}
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
    </LastTicketsCardContainer>
  );
};

const LastTickets = ({ data }) => {
  return (
    <LastTicketsContainer>
      <CardTitle text="Последние билеты" className={"last-tickets"} />
      <div className="card-deck last-tickets-menu-group no-gutters">
        {data && data.map((item) => (
          <LastTicketsItem key={nanoid()} item={item} />
        ))}
      </div>
    </LastTicketsContainer>
  );
};

// AssistantBlock Component
const AssistantBlock = () => {
  const { from, to } = useSelector(
    (state) => state.catalogTrains.searchData.travelData
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let upData = parsedUrlString(location.search);

  const handleChangeSwitch = (event) => {
    const inputName = event.target.name;
    const checked = event.target.checked;
    if (
      from.date &&
      from.city.name &&
      to.city.name &&
      location.pathname === "/fe-diplom/trains"
    ) {
      dispatch(
        setTrainsParameters({ data: { name: inputName, status: checked } })
      );
    }

    let newValue = Object.keys(upData.parameters).find((key) =>
      key.includes(inputName)
    );

    if (newValue) {
      upData.parameters[newValue] = checked;
      const urlSearchString = getUrlSearch(
        upData.optionsName,
        upData.formData,
        upData.filter,
        upData.parameters
      );
      navigate({
        search: `${urlSearchString}`,
      });
    }
  };

  return (
    <BlockWrapper>
      <FormSideBar from={from.date} to={to.date} />
      <SwitchBlock handleChange={handleChangeSwitch} />
      <PriceBlock />
      <SideBlock type="departure" date={from.date} side="start" />
      <SideBlock type="arrival" date={to.date} side="end" />
    </BlockWrapper>
  );
};

// OrderDetails Component
const OrderDetails = () => {
  const { dataSeats, totalPrice } = useSelector((state) => state.passengers);
  const { from, to } = useSelector(
    (state) => state.catalogTrains.searchData.travelData
  );
  
  return (
    <OrderDetailsWrapper>
      <OrderDetailsHeader>
        <Title className="order-details-block_title" text="Детали поездки" />
      </OrderDetailsHeader>
      <SideBlock type="departure" parent="order-details" date={from.date} side="start" />
      <SideBlock type="arrival" parent="order-details" date={to.date} side="end"/>
      <QuantityPassBlock data={dataSeats} />
      <OrderDetailsFooter>
        <CardTitle className="order-details price" text="Итог" />
        <span className="order-details price-text">
          {formattedPrice(totalPrice)}
        </span>
        <svg
          className="order-details currency_icon"
          width="26"
          height="32"
          viewBox="0 0 26 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.50073 19.2081C6.50073 20.2833 6.50073 21.3372 6.50073 22.4039C9.20503 22.4039 11.9007 22.4039 14.6093 22.4039C14.6093 23.4749 14.6093 24.5331 14.6093 25.6083C11.9093 25.6083 9.20936 25.6083 6.50073 25.6083C6.50073 27.746 6.50073 29.8666 6.50073 32C5.41294 32 4.33815 32 3.24603 32C3.24603 29.8751 3.24603 27.7502 3.24603 25.6168C2.15824 25.6168 1.08779 25.6168 0.00433382 25.6168C0.00433382 24.5459 0.00433382 23.4877 0.00433382 22.4125C1.07912 22.4125 2.15391 22.4125 3.23303 22.4125C3.23303 21.3415 3.23303 20.2876 3.23303 19.2166C2.15824 19.2166 1.08345 19.2166 0 19.2166C0 18.1414 0 17.0832 0 16.0122C1.07479 16.0122 2.14957 16.0122 3.23736 16.0122C3.23736 10.6744 3.23736 5.34944 3.23736 0.0159157C3.30237 0.0116489 3.34571 0.00738204 3.39338 0.00738204C7.7272 0.00738204 12.061 -0.0139521 16.3948 0.0159157C18.8954 0.032983 21.071 0.933282 22.8999 2.61441C24.4341 4.02246 25.4222 5.74625 25.8122 7.77726C26.3539 10.6062 25.7212 13.1876 23.9443 15.4746C22.7265 17.0448 21.136 18.1286 19.2292 18.7473C18.2974 19.0502 17.3396 19.2081 16.3602 19.2081C13.1401 19.2123 9.92444 19.2081 6.70442 19.2123C6.63941 19.2081 6.5744 19.2081 6.50073 19.2081ZM6.50506 3.2075C6.50506 7.48712 6.50506 11.7454 6.50506 16.008C6.55273 16.008 6.59174 16.008 6.63074 16.008C9.88111 16.008 13.1315 16.0165 16.3818 15.9994C16.8846 15.9952 17.4003 15.9226 17.8857 15.7989C21.3224 14.9029 23.3636 11.5747 22.5835 8.17408C21.9161 5.27264 19.2898 3.2075 16.2648 3.2075C13.0795 3.2075 9.89411 3.2075 6.70875 3.2075C6.64374 3.2075 6.57874 3.2075 6.50506 3.2075Z"
            fill="#E5E5E5"
          />
        </svg>
      </OrderDetailsFooter>
    </OrderDetailsWrapper>
  );
};

// Main SideBar Component
const SideBar = () => {
  const location = useLocation();
  const params = useParams();

  const { data = [] } = useGetLastTicketsQuery();

  if (
    location.pathname === "/fe-diplom" ||
    location.pathname === "/fe-diplom/order-result"
  ) {
    return null;
  }

  const getLocation = () => {
    const path = location.pathname;
    return path.includes('/trains') || path.includes('/seats/');
  };

  const shouldShowAssistant = getLocation();

  return (
    <SidebarContainer className="container p-0">
      <div className="sidebar" id="sidebar">
        {shouldShowAssistant ? <AssistantBlock /> : <OrderDetails />}
        {shouldShowAssistant && data && data.length > 0 && (
          <LastTickets data={data.slice(0, 3)} />
        )}
      </div>
    </SidebarContainer>
  );
};

export default SideBar;

// Экспорты отдельных компонентов для возможного использования в других местах
export {
  TripDetails,
  AssistantBlock,
  QuantityPassBlock,
  SideBlock,
  PriceBlock,
  SwitchBlock,
  Timing,
  LastTickets,
  RangeSlider,
  OrderDetails
};