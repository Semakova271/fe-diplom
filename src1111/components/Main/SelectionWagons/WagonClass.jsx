import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardTitle, Button } from "../../BasicComponents/BasicComponents";
import Tooltip from "../../Molecules/Molecules/Moleculescomponent";
import { templateText } from "../../../utils/dataText";
import { setTicketNoSeats } from "../../../features/passengersSlice";
import { getDisabled, getSeatsArr, getClassName, getArrWagons } from "../../../utils/WagonSelectionUtils";
import Wagon from "../../Molecules/SelectionWagon/WagonServices";
import GoBackBlock from "../../Molecules/SelectionWagon/WagonServices";
import Card from "../../Main/CardsBlock/CardBlock";
import { CardBody, CardBottom, CardTop } from "../../Main/CardsBlock/CardBlock";
import { nanoid } from "nanoid";

/* ===== WAGON TYPE BUTTONS COMPONENT ===== */
const WagonsTypesBlock = ({ className, selectedType, setSelectedType }) => {
  const wagonTypes = [
    {
      type: "fourth",
      label: "Сидячий",
      icon: (
        <svg width="31" height="50" viewBox="0 0 31 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 19.0289C0.307988 18.6378 0.559979 18.1523 0.951964 17.8691C2.23992 16.952 3.90585 17.5859 4.28384 19.1368C4.61983 20.5394 4.89982 21.9554 5.19381 23.3714C5.71179 25.8124 6.21577 28.2669 6.74775 30.7079C7.44772 33.8771 9.58964 35.5494 12.9635 35.5629C15.3714 35.5764 17.7653 35.5494 20.1732 35.5764C21.5872 35.5898 22.3852 36.2102 22.6092 37.397C22.8331 38.6782 21.9232 39.8649 20.5792 39.8784C17.4573 39.9054 14.3355 39.9863 11.2136 39.8515C7.37772 39.6896 3.80786 36.6418 2.81389 32.7847C2.16992 30.2628 1.69394 27.7005 1.13396 25.1651C0.769971 23.4793 0.377986 21.807 0 20.1213C0 19.7572 0 19.393 0 19.0289Z" fill={selectedType === "fourth" ? "#FFA800" : "#C4C4C4"} />
          <path d="M9.87021 0C10.9762 0.229264 11.9981 0.579903 12.8801 1.30815C14.714 2.8186 15.274 5.58325 14.126 7.63314C12.8801 9.87183 10.2622 10.9777 7.86828 10.2899C5.48837 9.60211 4.06042 7.94332 3.87843 5.44839C3.73844 3.53336 4.8024 1.51044 7.01431 0.512472C7.51829 0.283208 8.07827 0.175319 8.62425 0C9.03024 0 9.45022 0 9.87021 0Z" fill={selectedType === "fourth" ? "#FFA800" : "#C4C4C4"} />
          <path d="M24.667 34.5108C24.331 34.5108 24.0931 34.5108 23.8691 34.5108C20.2852 34.5108 16.7013 34.5243 13.1035 34.5108C10.3596 34.4973 8.51164 33.0408 7.97966 30.4515C7.05569 26.055 6.14572 21.6586 5.22176 17.2621C4.28379 12.7982 8.44164 10.6404 11.4235 11.571C13.3275 12.1643 14.3074 13.5399 14.6994 15.3336C15.4834 18.9344 16.2253 22.5352 16.9533 26.1359C17.0793 26.7833 17.2893 27.026 18.0173 27.0125C20.9292 26.9856 23.8411 26.9856 26.753 27.08C28.7269 27.1339 30.2528 28.6713 30.3928 30.5729C30.4208 30.8965 30.4348 31.2202 30.4348 31.5439C30.4348 36.5472 30.4348 41.5371 30.4348 46.5404C30.4348 46.9855 30.4348 47.444 30.3368 47.8755C30.0288 49.2376 28.7969 50.0873 27.3549 49.9929C25.941 49.8985 24.835 48.86 24.695 47.4845C24.667 47.1608 24.667 46.8371 24.667 46.5135C24.667 42.7778 24.667 39.0287 24.667 35.293C24.667 35.0637 24.667 34.821 24.667 34.5108Z" fill={selectedType === "fourth" ? "#FFA800" : "#C4C4C4"} />
        </svg>
      )
    },
    {
      type: "third",
      label: "Плацкарт",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M45.4854 0H4.51465C2.03174 0 0 2.0293 0 4.50958V45.4904C0 47.9707 2.03174 50 4.51465 50H17.6475H18.6475H45.4854C47.9683 50 50 47.9707 50 45.4904V4.50958C50 2.0293 47.9683 0 45.4854 0ZM18.6475 47.1815H35.1582C36.3994 47.1815 37.4155 46.1669 37.4155 44.9268H37.3589V40.868C37.3589 39.6279 36.3433 38.6133 35.1016 38.6133H18.6475V47.1815ZM17.6475 38.6133H14.8418C13.6006 38.6133 12.5845 39.6279 12.5845 40.868V44.9268C12.5845 46.1669 13.6006 47.1815 14.8418 47.1815H17.6475V38.6133ZM6.60254 29.0868C5.64355 29.0868 4.85352 28.2976 4.85352 27.3394V11.7646H13.4312V27.3394C13.4312 28.2976 12.6411 29.0868 11.6816 29.0868H6.60254ZM4.85352 6.08795V10.7646H13.4312V6.08795C13.4312 5.12964 12.6411 4.34045 11.6816 4.34045H6.60254C5.64355 4.34045 4.85352 5.12964 4.85352 6.08795ZM36.0044 27.283V11.7646H44.6387V27.283C44.6387 28.2976 43.7925 29.1432 42.7764 29.1432H37.8667C36.8511 29.1432 36.0044 28.2976 36.0044 27.283ZM36.0044 10.7646H44.6387V6.14429C44.6387 5.12964 43.7925 4.28412 42.7764 4.28412H37.8667C36.8511 4.28412 36.0044 5.12964 36.0044 6.14429V10.7646Z" fill={selectedType === "third" ? "#FFA800" : "#C4C4C4"} />
        </svg>
      )
    },
    {
      type: "second",
      label: "Купе",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.51465 0H45.4854C47.9683 0 50 2.04541 50 4.54541V45.4546C50 47.9546 47.9683 50 45.4854 50H4.51465C2.03174 50 0 47.9546 0 45.4546V4.54541C0 2.04541 2.03174 0 4.51465 0ZM38.6006 6.25C37.3589 6.25 36.3433 7.27295 36.3433 8.52295V13.7061H44.9775V8.52295C44.9775 7.27295 43.9614 6.25 42.7202 6.25H38.6006ZM44.9775 14.7061H36.3433V29.5454C36.3433 30.7954 37.3589 31.8184 38.6006 31.8184H42.7202C43.9614 31.8184 44.9775 30.7954 44.9775 29.5454V14.7061ZM13.3745 13.7061V8.75C13.3745 7.38623 12.2461 6.25 10.8916 6.25H7.22363C5.86914 6.25 4.74023 7.38623 4.74023 8.75V13.7061H13.3745ZM4.74023 14.7061H13.3745V29.375C13.3745 30.7388 12.2461 31.875 10.8916 31.875H7.22363C5.86914 31.875 4.74023 30.7388 4.74023 29.375V14.7061ZM44.8081 49.2046C47.1782 49.2046 49.1533 47.2729 49.1533 44.8296V36.7046H0.84668V44.8296C0.84668 47.2158 2.76514 49.2046 5.19189 49.2046H44.8081Z" fill={selectedType === "second" ? "#FFA800" : "#C4C4C4"} />
        </svg>
      )
    },
    {
      type: "first",
      label: "Люкс",
      icon: (
        <svg width="57" height="50" viewBox="0 0 57 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.2258 0L34.8606 19.0776H56.4516L39.0213 30.9224L45.6561 50L28.2258 38.26L10.7955 50L17.4303 30.9224L0 19.0776H21.5911L28.2258 0Z" fill={selectedType === "first" ? "#FFA800" : "#C4C4C4"} />
        </svg>
      )
    }
  ];

  return (
    <div className={`${className}_block`}>
      <CardTitle className={className} text="Тип вагона" />
      <div className={`${className}_buttons-group`}>
        {wagonTypes.map((wagon) => (
          <Button
            key={wagon.type}
            type={className}
            onClick={() => setSelectedType(wagon.type)}
          >
            {wagon.icon}
            <span
              className={`${className}_buttons-text`}
              style={{ color: selectedType === wagon.type ? "#FFA800" : "#C4C4C4" }}
            >
              {wagon.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

/* ===== QUANTITY TICKETS COMPONENT ===== */
const QuantityTickets = ({ className, data, selected, setSelected }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const tooltipRef = useRef();

  const baseClassItem = `${className}_block-menu-item`;

  const handleMouseOver = (event) => {
    event.preventDefault();
    tooltipRef.current = event.target.dataset.name;
    document.querySelector(`.tooltip_${tooltipRef.current}`).classList.add("visible");
  };

  const handleMouseOut = (event) => {
    event.preventDefault();
    document.querySelector(`.tooltip_${tooltipRef.current}`).classList.remove("visible");
  };

  const handleSelect = (type) => {
    setSelected({ type });
  };

  const handleInputChange = (event) => {
    document.querySelector(`.tooltip_${tooltipRef.current}`).classList.remove("visible");
    
    if (event.target.value === "") return;

    inputRef.current = event.target.parentElement;
    
    if (data[0].count < Number(event.target.value)) {
      inputRef.current.classList.add("error-quantity");
      inputRef.current.nextElementSibling.style.visibility = "visible";
      return;
    }

    inputRef.current.nextElementSibling.style.visibility = "hidden";
    inputRef.current.classList.remove("error-quantity");
    dispatch(setTicketNoSeats({ count: Number(event.target.value) }));
  };

  return (
    <div className={`${className}_block`}>
      <CardTitle className={`${className}_block`} text="Количество билетов" />
      
      <div className={`${className}_block-menu`}>
        {data.map((item) => (
          <div
            key={item.type}
            id={item.type}
            className={`${baseClassItem} ${item.type === selected.type ? "selected_type-tickets" : ""}`}
            onClick={() => item.type !== "child-no-seats" && handleSelect(item.type)}
          >
            <div className={`input-group-prepend ${className}_input-group`}>
              <span className={`${className} ${item.type}_input-group-text`}>
                {`${item.text} \u2013`}
              </span>
              <input
                type="number"
                data-name={item.type}
                className={`${className} ${item.type} input form-control`}
                id="exampleInputTypeTickets"
                aria-describedby="typeTickets"
                defaultValue={item.count}
                onChange={item.type === "child-no-seats" ? handleInputChange : undefined}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
              
              <Tooltip
                name={item.type}
                text={
                  item.type === "child-no-seats" 
                    ? "Введите количество билетов"
                    : "Кликните на иконку вагона и выберите место из доступных"
                }
              />
            </div>
            
            {item.type === "child-no-seats" ? (
              <Tooltip
                name="quantity-tickets"
                text="*Количество билетов без места не должно превышать количество взрослых билетов"
              />
            ) : (
              <label
                htmlFor="exampleInputTypeTickets"
                className={`${className} ${item.type}_input-label`}
              >
                {templateText(item)}
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ===== TRAIL DETAILS COMPONENT ===== */
const TrailDetails = ({ className, data }) => {
  if (!data) return null;

  return (
    <div className={`${className}_details`}>
      <GoBackBlock className={className} type="come-back" />
      <Card data={data} className="trains-block">
        <CardTop className="trains-block_card-top" data={data} />
        <CardBody className="trains-block_body" data={data} />
        <CardBottom className="trains-block" data={data.duration} />
      </Card>
    </div>
  );
};

/* ===== BASE WAGON COMPONENT ===== */
const BaseWagon = ({ 
  data, 
  selectedTypeTicket, 
  onClick, 
  className, 
  seatsBtnsArr, 
  renderSeats 
}) => {
  const dataSeats = useSelector((state) => state.passengers.dataSeats);
  const passengers = useSelector((state) => state.passengers.passengers);

  return (
    <div className={`wagon_item ${className}`}>
      <div className="wagon_template-block">
        <span className="template-text">
          {className.includes("first") ? "19" : "11"} человек выбирают места в этом поезде
        </span>
      </div>
      <div className={`utils-wagon_wrap ${className}_wrap`}>
        {renderSeats(seatsBtnsArr, data, dataSeats, passengers, selectedTypeTicket, onClick)}
      </div>
    </div>
  );
};

/* ===== WAGON COMPONENTS ===== */
const WagonFirstClass = ({ data, selectedTypeTicket, onClick }) => {
  const seatsBtnsArr = getSeatsArr(data.coach.class_type);

  const renderSeats = (seatsBtnsArr, data, dataSeats, passengers, selectedTypeTicket, onClick) => (
    <div className="utils-wagon-wagon-first_class_sector">
      <div className="utils-wagon-wagon-first_class_sector-row">
        {seatsBtnsArr.map((item) => (
          <div key={nanoid()} className="utils-wagon_buttons-block_box first_class-buttons-block_box">
            {item.map((seat) => (
              <button
                key={seat}
                data-id={seat}
                data-wagon_id={data.coach._id}
                data-price={data.coach.bottom_price}
                className={`utils-wagon_button_box wagon-first_class_seat-btn${getClassName(seat, data, passengers)}`}
                onClick={(event) => onClick(event, selectedTypeTicket)}
                disabled={getDisabled(seat, data.seats, dataSeats, selectedTypeTicket)}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <BaseWagon
      data={data}
      selectedTypeTicket={selectedTypeTicket}
      onClick={onClick}
      className="wagon-first_class"
      seatsBtnsArr={seatsBtnsArr}
      renderSeats={renderSeats}
    />
  );
};

const WagonSecondClass = ({ data, selectedTypeTicket, onClick }) => {
  const seatsBtnsArr = getSeatsArr(data.coach.class_type);

  const renderSeats = (seatsBtnsArr, data, dataSeats, passengers, selectedTypeTicket, onClick) => (
    <div className="utils-wagon-wagon-second_class_sector">
      {seatsBtnsArr.map((item) => (
        <div key={nanoid()} className="utils-wagon_buttons-block_box second_class-buttons-block_box">
          {item.map((seat) => (
            <button
              key={seat}
              data-id={seat}
              data-wagon_id={data.coach._id}
              data-price={data.coach.bottom_price}
              className={`utils-wagon_button_box wagon-second_class_seat-btn${getClassName(seat, data, passengers)}`}
              onClick={(event) => onClick(event, selectedTypeTicket)}
              disabled={getDisabled(seat, data.seats, dataSeats, selectedTypeTicket)}
            >
              {seat}
            </button>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <BaseWagon
      data={data}
      selectedTypeTicket={selectedTypeTicket}
      onClick={onClick}
      className="wagon-second_class"
      seatsBtnsArr={seatsBtnsArr}
      renderSeats={renderSeats}
    />
  );
};

const WagonThirdClass = ({ data, selectedTypeTicket, onClick }) => {
  const seatsBtnsArr = getSeatsArr(data.coach.class_type);

  const renderSeats = (seatsBtnsArr, data, dataSeats, passengers, selectedTypeTicket, onClick) => (
    <>
      <div className="utils-wagon-second_class_sector">
        {seatsBtnsArr[0].map((item) => (
          <div key={nanoid()} className="utils-wagon_buttons-block_box">
            {[1, 0].map((index) => (
              <button
                key={item[index]}
                data-price={index === 1 ? data.coach.top_price : data.coach.bottom_price}
                data-id={item[index]}
                data-wagon_id={data.coach._id}
                className={`utils-wagon_button_box${getClassName(item[index], data, passengers)}`}
                onClick={(event) => onClick(event, selectedTypeTicket)}
                disabled={getDisabled(item[index], data.seats, dataSeats, selectedTypeTicket)}
              >
                {item[index]}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="utils-wagon-second_class_sector side-sector">
        {seatsBtnsArr[1].map((item) => (
          <div key={nanoid()} className="utils-wagon_buttons-block_side-box">
            {[0, 1].map((index) => (
              <button
                key={item[index]}
                data-price={index === 1 ? data.coach.top_price : data.coach.bottom_price}
                data-id={item[index]}
                data-wagon_id={data.coach._id}
                className={`utils-wagon_button_box side-button_box${getClassName(item[index], data, passengers)}`}
                onClick={(event) => onClick(event, selectedTypeTicket)}
                disabled={getDisabled(item[index], data.seats, dataSeats, selectedTypeTicket)}
              >
                {item[index]}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <BaseWagon
      data={data}
      selectedTypeTicket={selectedTypeTicket}
      onClick={onClick}
      className="wagon-third_class"
      seatsBtnsArr={seatsBtnsArr}
      renderSeats={renderSeats}
    />
  );
};

const WagonFourthClass = ({ data, selectedTypeTicket, onClick }) => {
  const seatsBtnsArr = getSeatsArr(data.coach.class_type);

  const renderSeats = (seatsBtnsArr, data, dataSeats, passengers, selectedTypeTicket, onClick) => (
    <>
      <div className="utils-wagon-wagon-fourth_class_sector">
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className={`utils-wagon-wagon-fourth_class_sector-row ${rowIndex === 1 ? "" : "short-row"}`}>
            {seatsBtnsArr[0][rowIndex === 0 ? "evenArr" : "oddArr"].map((seat) => (
              <button
                key={seat}
                data-id={seat}
                data-wagon_id={data.coach._id}
                data-price={data.coach.bottom_price}
                className={`utils-wagon_button_box wagon-fourth_class_seat-btn${getClassName(seat, data, passengers)}`}
                onClick={(event) => onClick(event, selectedTypeTicket)}
                disabled={getDisabled(seat, data.seats, dataSeats, selectedTypeTicket)}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="utils-wagon-wagon-fourth_class_sector">
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className={`utils-wagon-wagon-fourth_class_sector-row ${rowIndex === 0 ? "short-row" : ""}`}>
            {seatsBtnsArr[1][rowIndex === 0 ? "evenArr" : "oddArr"].map((seat) => (
              <button
                key={seat}
                data-id={seat}
                data-wagon_id={data.coach._id}
                data-price={data.coach.bottom_price}
                className={`utils-wagon_button_box wagon-fourth_class_seat-btn${getClassName(seat, data, passengers)}`}
                onClick={(event) => onClick(event, selectedTypeTicket)}
                disabled={getDisabled(seat, data.seats, dataSeats, selectedTypeTicket)}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <BaseWagon
      data={data}
      selectedTypeTicket={selectedTypeTicket}
      onClick={onClick}
      className="wagon-fourth_class"
      seatsBtnsArr={seatsBtnsArr}
      renderSeats={renderSeats}
    />
  );
};

/* ===== SEATS DETAILS COMPONENT ===== */
const SeatsDetails = ({ className, data, selectedTypeTicket, onClick }) => {
  const { totalPrice } = useSelector((state) => state.passengers);

  if (!data.length) return null;

  const result = getArrWagons(data);

  return (
    <div key={nanoid()} className={`${className}_block`}>
      <div className={`${className}_block-header`}>
        <div className={`${className}_buttons-block`}>
          <span className={`${className}_buttons-block-label`}>Вагоны</span>
          {result.map((item) => (
            <Button key={nanoid()} type="number-wagons" text={item.index} />
          ))}
        </div>
        <span className={`${className}_buttons-block-legend`}>
          Нумерация вагонов начинается с головы поезда
        </span>
      </div>
      
      <div className={`${className}_block-body`}>
        {result.map((item) => (
          <div key={nanoid()} className="wagon-util">
            <Wagon className={className} data={item} num={item.index} />
            
            {item.coach.class_type === "first" && (
              <WagonFirstClass
                key={nanoid()}
                data={item}
                selectedTypeTicket={selectedTypeTicket}
                onClick={onClick}
              />
            )}
            {item.coach.class_type === "second" && (
              <WagonSecondClass
                key={nanoid()}
                data={item}
                selectedTypeTicket={selectedTypeTicket}
                onClick={onClick}
              />
            )}
            {item.coach.class_type === "third" && (
              <WagonThirdClass
                key={nanoid()}
                data={item}
                selectedTypeTicket={selectedTypeTicket}
                onClick={onClick}
              />
            )}
            {item.coach.class_type === "fourth" && (
              <WagonFourthClass
                key={nanoid()}
                data={item}
                selectedTypeTicket={selectedTypeTicket}
                onClick={onClick}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className={`${className}_block-bottom`}>
        <span className={`${className}_block-bottom_text`}>
          {totalPrice > 0 ? totalPrice : ""}
        </span>
        {totalPrice > 0 && (
          <svg className="available-seats-details_currency-icon" width="14" height="17" viewBox="0 0 14 17" fill="none">
            <path d="M3.50039 10.2043C3.50039 10.7755 3.50039 11.3354 3.50039 11.9021C4.95655 11.9021 6.40805 11.9021 7.86655 11.9021C7.86655 12.471 7.86655 13.0332 7.86655 13.6044C6.41272 13.6044 4.95889 13.6044 3.50039 13.6044C3.50039 14.7401 3.50039 15.8666 3.50039 17C2.91466 17 2.33593 17 1.74786 17C1.74786 15.8712 1.74786 14.7423 1.74786 13.6089C1.16213 13.6089 0.585732 13.6089 0.00233359 13.6089C0.00233359 13.04 0.00233359 12.4778 0.00233359 11.9066C0.581065 11.9066 1.1598 11.9066 1.74086 11.9066C1.74086 11.3377 1.74086 10.7778 1.74086 10.2088C1.16213 10.2088 0.583399 10.2088 0 10.2088C0 9.6376 0 9.07545 0 8.50649C0.578731 8.50649 1.15746 8.50649 1.7432 8.50649C1.7432 5.67079 1.7432 2.84189 1.7432 0.00845521C1.7782 0.00618846 1.80154 0.00392171 1.8272 0.00392171C4.1608 0.00392171 6.49439 -0.00741203 8.82799 0.00845521C10.1745 0.0175222 11.3459 0.495806 12.3307 1.3889C13.1568 2.13693 13.6889 3.0527 13.8989 4.13167C14.1906 5.63452 13.8499 7.00591 12.8931 8.22088C12.2374 9.05505 11.3809 9.6308 10.3542 9.95948C9.85244 10.1204 9.33671 10.2043 8.80932 10.2043C7.07546 10.2066 5.34393 10.2043 3.61007 10.2066C3.57507 10.2043 3.54006 10.2043 3.50039 10.2043ZM3.50273 1.70398C3.50273 3.97753 3.50273 6.23975 3.50273 8.50423C3.52839 8.50423 3.5494 8.50423 3.5704 8.50423C5.3206 8.50423 7.07079 8.50876 8.82099 8.49969C9.09168 8.49743 9.36938 8.45889 9.63074 8.39316C11.4813 7.91714 12.5804 6.14908 12.1604 4.34248C11.801 2.80109 10.3868 1.70398 8.75798 1.70398C7.04279 1.70398 5.3276 1.70398 3.6124 1.70398C3.5774 1.70398 3.5424 1.70398 3.50273 1.70398Z" fill="#928F94" />
          </svg>
        )}
      </div>
    </div>
  );
};

export {
  WagonsTypesBlock,
  QuantityTickets,
  TrailDetails,
  WagonFirstClass,
  WagonSecondClass,
  WagonThirdClass,
  WagonFourthClass,
  SeatsDetails
};

export default SeatsDetails;