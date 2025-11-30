import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDuration } from "date-fns";
import { ru } from "date-fns/locale";
import DatePicker from "react-datepicker";
import ReactPaginate from "react-paginate";
import "react-datepicker/dist/react-datepicker.css";
import { setForm } from "../../../features/formTicketsSlice";
import { setParameters, setTrainsParameters } from "../../../features/catalogTrainsSlice";
import { parsedUrlString, getUrlSearch, dateFormatted } from "../../../utils/trainSelectionUtils";
import { dataReview } from "../../../utils/dataText";
import { Title, Button, MySvgIcon } from "../../BasicComponents/BasicComponents";
import Card from "../../Main/CardsBlock/CardBlock";
import { CardTop as Top, CardBottom as Bottom, CardBody as Body } from "../../Main/CardsBlock/CardBlock";
import TrainsMenu from "../../Main/SelectionTrain/SearchControls";
import "../../Forms/form.css";

// Tooltip Component
const Tooltip = ({ name, text }) => {
  return (
    <div className={`services_tooltip tooltip_${name}`}>
      <span className={`tooltip_text text_${name}`}>{text}</span>
    </div>
  );
};

// Review Component
const Review = () => {
  const QuoteIcon = ({ type = "left" }) => (
    <svg
      className={`quote-${type}`}
      width={type === "left" ? "13" : "12"}
      height={type === "left" ? "10" : "9"}
      viewBox={`0 0 ${type === "left" ? "13 10" : "12 9"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={
          type === "left" 
            ? "M4.11523 0.542969L6.29492 1.89648C5.22852 3.45508 4.67773 5.07812 4.64258 6.76562V9.4375H0.898438V7.01172C0.910156 5.88672 1.21484 4.71484 1.8125 3.49609C2.42188 2.26562 3.18945 1.28125 4.11523 0.542969ZM10.0215 0.542969L12.2012 1.89648C11.1348 3.45508 10.584 5.07812 10.5488 6.76562V9.4375H6.80469V7.01172C6.81641 5.88672 7.12109 4.71484 7.71875 3.49609C8.32812 2.26562 9.0957 1.28125 10.0215 0.542969Z"
            : "M2.30469 9L0.125 7.64648C1.17969 6.11133 1.72461 4.48828 1.75977 2.77734V0H5.50391V2.42578C5.50391 3.63281 5.19336 4.85156 4.57227 6.08203C3.96289 7.30078 3.20703 8.27344 2.30469 9ZM8.17578 9L5.99609 7.64648C7.05078 6.11133 7.5957 4.48828 7.63086 2.77734V0H11.375V2.42578C11.375 3.63281 11.0645 4.85156 10.4434 6.08203C9.83398 7.30078 9.07812 8.27344 8.17578 9Z"
        }
        fill="#928F94"
      />
    </svg>
  );

  const ReviewCard = ({ review }) => (
    <div className="card card-feedback-item">
      <div className="card-top ifeedback-item__img-wrap">
        <img
          src={review.avatar}
          className="card feedback__img"
          alt="avatar"
        />
      </div>
      <div className="card-body p-0 body-feedback">
        <p className="card-title feedback-item__author">{review.author}</p>
        <p className="feedback-item__text">
          <QuoteIcon type="left" />
          {review.text}
          <QuoteIcon type="right" />
        </p>
      </div>
    </div>
  );

  return (
    <div className="card-deck feedback-group">
      <ReviewCard review={dataReview[0]} />
      <ReviewCard review={dataReview[1]} />
    </div>
  );
};

// PaginatedItems Component
const PaginatedItems = ({ itemsPerPage, items, listItems }) => {
  const [currentItems, setCurrentItems] = useState(listItems);
  const [pageCount, setPageCount] = useState(0);
  
  const itemOffset = useSelector(
    (state) => state.catalogTrains.searchData.parameters.offset
  );
  
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const upData = parsedUrlString(location.search);

  useEffect(() => {
    setCurrentItems(listItems);
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [location, items, listItems, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    
    // Используем setCatalogForm для обновления offset
    dispatch(setParameters({ offset: newOffset }));
    
    // Обновляем upData.filter для формирования URL
    if (upData.filter) {
      upData.filter.offset = newOffset;
    }
    
    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({ search: `${urlSearchString}` });
  };

  return (
    <>
      <TrainsMenu currentItems={currentItems} />
      <ReactPaginate
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={false}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel=""
        pageClassName="trains-menu-pagination__item"
        pageLinkClassName="trains-menu-pagination__item-link"
        previousClassName="trains-menu-pagination__item"
        previousLinkClassName="trains-menu-pagination__previus-item-link"
        nextClassName="trains-menu-pagination__item"
        nextLinkClassName="trains-menu-pagination__next-item-link"
        breakLabel="..."
        breakClassName="trains-menu-pagination__item"
        breakLinkClassName="trains-menu-pagination__item-link"
        containerClassName="selection-trains-pagination"
        activeClassName="trains-menu-pagination_active-link"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

// Banner Component
const Banner = ({ banner, className, children }) => {
  const location = useLocation();
  
  return (
    <div className={className}>
      {location.pathname === "/fe-diplom" && (
        <Title
          text="Вся жизнь - "
          strongText={"путешествие!"}
          className={"banner_title"}
        />
      )}
      <img src={banner} className="img-banner" alt="train-banner" />
      {children}
    </div>
  );
};

// FormCalendar Component
const FormCalendar = ({ value, type, className }) => {
  const [date, setDate] = useState(value);
  const dispatch = useDispatch();
  
  const getClasses = (date) => {
    const { getDate, isThisMonth, isSunday, isBefore } = require("date-fns");
    
    let basedClasses = isSunday(date) ? "sunday_date" : "";
    basedClasses = isThisMonth(date)
      ? `${basedClasses} current-month_day`
      : `${basedClasses} outside_day`;
    basedClasses = isBefore(getDate(date), getDate(new Date()))
      ? `before_day ${basedClasses}`
      : basedClasses;

    return basedClasses;
  };

  return (
    <DatePicker
      showIcon
      selected={date}
      value={new Date(date)}
      onChange={(newDate) => {
        setDate(newDate);
        dispatch(
          setForm({ type: type, status: false, data: dateFormatted(newDate) })
        );
      }}
      placeholderText="ДД/ММ/ГГГГ"
      dateFormat="dd/MM/yyyy"
      className={`${className} form-calendar`}
      locale={ru}
      dayClassName={getClasses}
      minDate={new Date()}
      showDisabledMonthNavigation
    />
  );
};

// Info Component
const Info = ({ type, text, onClick }) => {
  const { nanoid } = require("nanoid");
  const icon_info = require("../../img/howItWorks/icon_info.svg");
  const icon_error = require("../../img/loading/icon_error.svg");

  return (
     <Card id={nanoid()} className={`active ${type}`}>
  <Top
    className={`${type}_card-top`}
    icon={type === "info" ? icon_info : icon_error}
  />
  <Body className={`${type}_card-body`}>
    <div className={`${type}_block-text`}>
      <p className={`${type}-text`}>{text}</p>
    </div>
  </Body>
  <Bottom className={`${type}_card`}>
    <Button
      type="modal"
      className="modal_control"
      text="Понятно"
      onClick={onClick}
    />
  </Bottom>
</Card>
  );
};

// ProgressBar Component
const ProgressBar = () => {
  const location = useLocation();
  const params = useParams();
 
  if (location.pathname === "/fe-diplom" || location.pathname === "/fe-diplom/order-result") {
    return null;
  }

  let step = 1;

  if (location.pathname === `/fe-diplom/screening/${params.id}`) {
    step = 4;
  } else if (location.pathname === `/fe-diplom/personal_information/${params.id}`) {
    step = 3;
  } else if (location.pathname === `/fe-diplom/passengers/${params.id}`) {
    step = 2;
  }

  const Step = ({ number, name, isActive, hasBorder = true }) => (
    <div className={`progress-bar ${isActive ? "step_active" : ""} p-0`}>
      {hasBorder && (
        <>
          <span className="border-top-step"></span>
          <span className="border-bottom-step"></span>
        </>
      )}
      <span className={`numbering ${number > 1 ? "margin-numbering" : ""}`}>
        {number}
      </span>
      <span className="progress-bar-name">{name}</span>
    </div>
  );

  return (
    <div className="progress">
      <Step number={1} name="Билеты" isActive={true} />
      <Step number={2} name="Пассажиры" isActive={step >= 2} />
      <Step number={3} name="Оплата" isActive={step >= 3} />
      <Step number={4} name="Проверка" isActive={step >= 4} hasBorder={false} />
    </div>
  );
};

// ReactRangeSlider Component
const ReactRangeSlider = () => {
  const dispatch = useDispatch();
  const { price_from, price_to } = useSelector((state) => state.filter);

  const onChange = (value) => {
  dispatch(setTrainsParameters({ 
    data: { 
      name: "price", 
      value: { price_from: value.min, price_to: value.max } 
    } 
  }));
};

  const InputRange = require("react-input-range"); // Assuming this is the package used

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

// Loader Component
const Loader = () => {
  const ic_loading_train = require("../../img/loading/ic_loading_train.svg");
  const ic_loading_line = require("../../img/loading/ic_loading_line.svg");

  return (
    <div className="loader_block">
      <span className="loader-text text-center">Идет поиск</span>
      <div className="icons_block">
        <MySvgIcon
          type="train"
          className={"loader"}
          icon={ic_loading_train}
        />
        <MySvgIcon
          type="line"
          className={"loader"}
          icon={ic_loading_line}
        />
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ type, onClick }) => {
  const { nanoid } = require("nanoid");
  const icon_info = require("../../img/howItWorks/icon_info.svg");

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <Card id={nanoid()} className={"modal"}>
  <Top className={"modal_card-top"} icon={icon_info} />
  <Body className={"modal_card-body"}>
    <div className="modal_block-text">
      <p className="info-text">
        Таким образом, консультация с широким активом в значительной
        степени обуславливает создание модели развития
      </p>
      <p className="info-text">
        повседневная практика показывает, что сложившаяся структура
        организации играет важную роль в формировании существенных
        финансовых и административных ...расходов
      </p>
    </div>
  </Body>
  <Bottom className={"modal_card"}>
    <Button
      type="modal"
      className="modal_control"
      text="Понятно"
      onClick={onClick}
    />
  </Bottom>
</Card>
      </div>
    </div>
  );
};

// TimingBlock Component (добавлен для полноты)
const TimingBlock = ({ className, duration }) => {
  const timeText = formatDuration(
    {
      hours: duration.hours,
      minutes: duration.minutes,
    },
    { locale: ru },
    { format: ["hours", "minutes"] }
  );

  return (
    <div className={`${className}-timing`}>
      <span>{timeText}</span>
    </div>
  );
};

// Экспорт всех компонентов
export {
  Tooltip,
  Review,
  PaginatedItems,
  Banner,
  FormCalendar,
  Info,
  ProgressBar,
  ReactRangeSlider,
  Loader,
  Modal,
  TimingBlock
};

export default {
  Tooltip,
  Review,
  PaginatedItems,
  Banner,
  FormCalendar,
  Info,
  ProgressBar,
  ReactRangeSlider,
  Loader,
  Modal,
  TimingBlock
};