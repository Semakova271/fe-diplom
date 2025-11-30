import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Title, CardTitle, MySvgIcon } from "../BasicComponents/BasicComponents";
import Banner from "../Molecules/Molecules/Moleculescomponent";
import MainForm from "../Forms/Forms";
import SideBar from "../SideBar/SideBar";
import ProgressBar from "../Molecules/Molecules/Moleculescomponent";
import Loader from "../Molecules/Molecules/Moleculescomponent";
import Info from "../Molecules/Molecules/Moleculescomponent";
import ControlledCheckbox from "../Molecules/MUI/components";
import PersonalDataForm from "../Forms/Forms";
import About from "../Main/Common/About";
import HowItWorks from "../Main/Common/Working";
import FeedBack from "../Main/Common/Feedback";
import SearchControls from "../Main/SelectionTrain/TrainsMenu/TrainsMenu";
import PaginatedItems from "../Molecules/Molecules/Moleculescomponent";
import TrailDetails from "../Main/SelectionWagons/WagonClass";
import QuantityTickets from "../Main/SelectionWagons/WagonClass";
import WagonsTypesBlock from "../Main/SelectionWagons/WagonClass";
import SeatsDetails from "../Main/SelectionWagons/WagonClass";
import AddPassenger from "../Main/Passengers/passengersInfo";
import BlockItem from "../Main/Passengers/passengersInfo";
import ScreenTrain from "../Main/Screening/ScreeningComponents";
import ScreenPassengers from "../Main/Screening/ScreeningComponents";
import ScreenPayment from "../Main/Screening/ScreeningComponents";
import ControlBlockFeedBack from "../Main/OrderResult/orderResult";
import Puncts from "../Main/OrderResult/orderResult";
import Appeal from "../Main/OrderResult/orderResult";
import Card from "../Main/CardsBlock/CardBlock";
import { CardTop, CardBody, CardBottom } from "../Main/CardsBlock/CardBlock";

// Импорты изображений
import banner1 from "../../img/banner1.png";
import banner3 from "../../img/banner3.png";
import banner_order_page from "../../img/banner_order_page.png";
import icon_info from "../../img/icon_info.svg";
import icon_error from "../../img/icon_error.svg";

// Импорты утилит и API
import { validateDataPassengers, validatePass } from "../../utils/formsValidator";
import { findWagon, getDuration, parsedUrlString, formattedFormData, getUrlSearch } from "../../utils/trainSelectionUtils";
import { getValidDataPass } from "../../utils/WagonSelectionUtils";
import { useAddOrderMutation, useGetTrainIdQuery, useGetTrainsListQuery } from "../../features/myApi";
import { addSeats, setDataPassengers, deletePassenger, setContributor } from "../../features/passengersSlice";
import { setTrainId, setDataRequest, upDateCatalog, setSelectionTrain, setParameters } from "../../features/catalogTrainsSlice";

// Импорты стилей
import "../Main/Screening/screening.css";
import "../Main/OrderResult/orderResult.css";
import "../Main/SelectionWagons/selectionWagons.css";
import "../Main/Passengers/passengersInfo.css";
import "../Main/PersonalData/personalData.css";
import "../Main/SelectionTrain/selectionTrain.css";
import "../Forms/form.css";

// HomePage Component
export const HomePage = () => {
  return (
    <>
      <Banner className="banner banner-home" banner={banner1} />
      <MainForm className="homepage_form" />
      <About />
      <HowItWorks />
      <FeedBack />
    </>
  );
};

// SelectionTrain Component
export const SelectionTrain = () => {
  const { parameters } = useSelector((state) => state.catalogTrains.searchData);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const upData = parsedUrlString(location.search);
  const formData = formattedFormData(upData);

  const { data = [], isLoading, isError } = useGetTrainsListQuery(upData, { 
    refetchOnMountOrArgChange: true 
  });

  useEffect(() => {
    dispatch(upDateCatalog({
      data: {
        formData,
        trainsParameters: upData.parameters,
        parameters: upData.filter,
      },
    }));
  }, [dispatch, formData, upData]);

  const onClickSorted = (event) => {
    event.preventDefault();
    let type;
    if (event.target.textContent === "времени") type = "date";
    if (event.target.textContent === "стоимости") type = "min_price";
    if (event.target.textContent === "длительности") type = "duration";

    dispatch(setParameters({ sort: { type, text: event.target.textContent } }));
    upData.filter.sort = type;

    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({ search: `${urlSearchString}` });
  };

  const onClickLimit = (event) => {
    event.preventDefault();
    dispatch(setParameters({ 
      limit: Number(event.target.textContent), 
      offset: 0 
    }));

    upData.filter.limit = Number(event.target.textContent);
    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({ search: `${urlSearchString}` });
  };

  const onClickInfo = (type) => {
    const element = document.querySelector(`.${type}_card`);
    element?.classList.remove("active");
  };

  return (
    <>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="selection-train_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="selection-train_content">
          {isLoading && <Loader />}
          {isError && (
            <Info
              type="error"
              text="Что-то пошло не так..."
              onClick={() => onClickInfo("error")}
            />
          )}

          {!isLoading && <ProgressBar />}
          {!isLoading && <SideBar />}

          {!isLoading && !isError && data.items ? (
            <section className="trains-menu-wrap d-flex" id="trains-menu">
              <SearchControls
                amount={data.total_count}
                sort={parameters.sort}
                limit={Number(parameters.limit)}
                onClickSorted={onClickSorted}
                onClickLimit={onClickLimit}
              />
              {data.items.length > 0 && !isLoading ? (
                <PaginatedItems
                  itemsPerPage={parameters.limit}
                  items={[...Array(data.total_count).keys()]}
                  listItems={data.items}
                />
              ) : (
                <Info
                  type="info"
                  text="По вашему запросу ничего не найдено"
                  onClick={() => onClickInfo("info")}
                />
              )}
            </section>
          ) : null}
          
          {!isLoading && data.error && (
            <div className="error__wrapper">
              <Info
                type="error"
                text={data.error}
                onClick={() => onClickInfo("error")}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// SelectionWagons Component
export const SelectionWagons = () => {
  const params = useParams();
  const [selectedTypeWagon, setSelectedTypeWagon] = useState(null);
  const [selectedTypeTicket, setSelectedTypeTicket] = useState({ type: "adult" });
  
  const { id, seleсtedTrain } = useSelector((state) => state.catalogTrains);
  const dataSeats = useSelector((state) => state.passengers.dataSeats);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const upData = parsedUrlString(location.search);
  const formData = formattedFormData(upData);

  const { data: list } = useGetTrainsListQuery(upData);
  const { data = [], isError: isErrorId, isLoading: isLoadingId } = useGetTrainIdQuery(params.id);

  const selectedSeats = { type: selectedTypeTicket.type, seats: null };

  if (!id) {
    dispatch(setDataRequest({ data: formData }));
    dispatch(setTrainId({ id: params.id }));
  }

  useEffect(() => {
    if (list) {
      const train = list.items.findIndex(
        (item) => item.departure._id === params.id
      );
      dispatch(setSelectionTrain({ data: list.items[train].departure }));
    }
    
    dispatch(upDateCatalog({
      data: {
        formData,
        trainsParameters: upData.parameters,
        parameters: upData.filter,
      },
    }));
  }, [seleсtedTrain, selectedTypeWagon, list, params.id, dispatch, formData, upData]);

  const onClickInfo = () => {
    document.querySelector(".info_card")?.classList.remove("active");
  };

  const clickSelectedSeats = (event) => {
    selectedSeats.seats = Number(event.target.dataset.id);
    selectedSeats.coach_id = event.target.dataset.wagon_id;
    selectedSeats.price = event.target.dataset.price;
    
    dispatch(addSeats({ data: selectedSeats }));
    dispatch(setDataPassengers({
      data: {
        coach_id: event.target.dataset.wagon_id,
        seat: selectedSeats,
        price: event.target.dataset.price,
      },
    }));
    
    event.target.classList.toggle("utils-wagon_button_selected");
  };

  const details = seleсtedTrain ? {
    duration: getDuration(seleсtedTrain.to.datetime, seleсtedTrain.from.datetime),
    from: {
      name: seleсtedTrain.from.city.name,
      datetime: seleсtedTrain.from.datetime * 1000,
      railway_station_name: seleсtedTrain.from.railway_station_name,
    },
    to: {
      name: seleсtedTrain.to.city.name,
      datetime: seleсtedTrain.to.datetime * 1000,
      railway_station_name: seleсtedTrain.to.railway_station_name,
    },
  } : null;

  const isValidSeats = getValidDataPass(dataSeats);

  return (
    <>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="selection-wagons_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="selection-wagon-content">
          {isLoadingId && <Loader />}
          {isErrorId && (
            <Info
              type="error"
              text="Что-то пошло не так..."
              onClick={onClickInfo}
            />
          )}
          
          {!isLoadingId && <ProgressBar />}
          {!isLoadingId && <SideBar />}
          
          {!isLoadingId && data && (
            <section className="selection-wagon_Block">
              <Title className="selection-wagon_title" text="Выбор мест" />
              
              {details && (
                <TrailDetails className="selection-wagon" data={details} />
              )}
              
              <QuantityTickets
                className="quantity-tickets"
                data={dataSeats}
                selected={selectedTypeTicket}
                setSelected={setSelectedTypeTicket}
              />
              
              <WagonsTypesBlock
                className="wagons-type"
                selectedType={selectedTypeWagon}
                setSelectedType={setSelectedTypeWagon}
              />
              
              {selectedTypeWagon && (
                <SeatsDetails
                  className="available-seats-details"
                  data={findWagon(data, selectedTypeWagon)}
                  selectedTypeTicket={selectedTypeTicket}
                  onClick={clickSelectedSeats}
                />
              )}
              
              <div className="selection-wagon-content_control">
                <Button
                  text="Далее"
                  type="next-block"
                  disabled={!isValidSeats.length}
                  onClick={() => navigate({
                    pathname: `/fe-diplom/passengers/${id}`,
                    search: location.search,
                  })}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

// PassengersInfo Component
export const PassengersInfo = () => {
  const { totalCount, passengers } = useSelector((state) => state.passengers);
  const navigate = useNavigate();
  const [count, setCount] = useState(
    Array(totalCount).fill().map((_, i) => i + 1)
  );
  const [showError, setShowError] = useState(false);
  const cardRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const isValidData = !validatePass(passengers);

  const clickHandler = (event) => {
    const cardElement = event.target.parentElement.nextSibling;
    cardElement?.classList.toggle("active-show");
    
    if (cardElement?.classList.contains("active-show")) {
      event.target.classList.add("expand-button");
    } else {
      event.target.classList.remove("expand-button");
    }
  };

  const updateCounter = (arr, id) => {
    return arr.filter((o) => o !== id).map((_, idx) => idx + 1);
  };

  const clickDelete = (id) => {
    dispatch(deletePassenger({ id }));
    setCount(prev => updateCounter(prev, id));
  };

  const onClickHandler = () => {
    if (validatePass(passengers)) {
      navigate({
        pathname: `/fe-diplom/personal_information/${params.id}`,
        search: location.search,
      });
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="passengers-info_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="passengers-info_content">
          <ProgressBar />
          <SideBar />
          <section className="passengers-info_block" ref={cardRef}>
            {count.length > 0 ? (
              count.map((item) => (
                <BlockItem
                  key={item}
                  id={item}
                  clickHandler={clickHandler}
                  clickDelete={clickDelete}
                  showInfo={true}
                />
              ))
            ) : (
              <Info
                type="info"
                text="Вы не выбрали ни одного места в вагоне"
                onClick={() => navigate({
                  pathname: `/fe-diplom/seats/${params.id}`,
                  search: location.search,
                })}
              />
            )}
            
            {count.length > 0 && (
              <AddPassenger state={count} setState={setCount} />
            )}
            
            <div className="passengers-info_section_control">
              {showError && (
                <Info
                  type="error"
                  text="Количество и типы пассажиров должны соответствовать количеству посадочных мест и типам билетов"
                  onClick={() => setShowError(false)}
                />
              )}
              
              {count.length > 0 && (
                <Button
                  text="Далее"
                  type={passengers.length ? "next-block" : "disabled next-block"}
                  disabled={!passengers.length}
                  onClick={onClickHandler}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// PersonalData Component
export const PersonalData = () => {
  const { loading } = useSelector((state) => state.catalogTrains);
  const { contributor, passengers } = useSelector((state) => state.passengers);
  const [state, setState] = useState(contributor);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const optionsPayment = ["Банковской картой", "PayPal", "Visa QIWI Wallet"];

  const onChangeInput = (value, id) => {
    const fieldMap = {
      "last_name": "last_name",
      "first_name": "first_name", 
      "patronymic": "patronymic",
      "phone": "phone",
      "e-mail": "email"
    };

    if (fieldMap[id]) {
      setState(prev => ({ ...prev, [fieldMap[id]]: value }));
    }
  };

  const handleChange = (event) => {
    if (event.target.value === "on") {
      setState(prev => ({ ...prev, payment_method: event.target.id }));
    }
  };

  const styledColor = (id, value) => id === value ? "#ffa800" : "inherit";
  const isValidData = validateDataPassengers(state);

  return (
    <>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="personal-data_wrap">
        <MainForm className="search-tickets_form" />
        <div className="personal-data_content">
          {!loading && <ProgressBar />}
          {!loading && <SideBar />}
          
          {passengers.length > 0 ? (
            <div className="personal-data_block">
              <div className="personal-data">
                <div className="personal-data_fullname">
                  <div className="personal-data_block-top">
                    <CardTitle
                      text="Персональные данные"
                      className="personal-data_block"
                    />
                  </div>
                  <PersonalDataForm data={state} onChange={onChangeInput} />
                </div>

                <div className="personal-data_payment">
                  <div className="personal-data_block-top" style={{
                    borderTop: "1px dashed #928F94",
                    borderBottom: "1px dashed #928F94",
                  }}>
                    <CardTitle
                      text="Способ оплаты"
                      className="personal-data_block"
                    />
                  </div>
                  
                  <div className="online-payment">
                    <div className="payment-wrap">
                      <ControlledCheckbox
                        id="online"
                        value={state.payment_method}
                        onChange={handleChange}
                      />
                      <span
                        className="payment-description"
                        style={{ color: styledColor("online", state.payment_method) }}
                      >
                        Онлайн
                      </span>
                    </div>
                    <div className="payment-options_block d-flex">
                      {optionsPayment.map((item) => (
                        <span key={item} className="payment-options_block-item">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="cash-payment" style={{ paddingTop: "58px" }}>
                    <div className="payment-wrap">
                      <ControlledCheckbox
                        id="cash"
                        value={state.payment_method}
                        onChange={handleChange}
                      />
                      <span
                        className="payment-description"
                        style={{ color: styledColor("cash", state.payment_method) }}
                      >
                        Наличными
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="personal-data_block-control">
                <Button
                  text="Купить билеты"
                  type={!isValidData ? "next-block" : "disabled next-block"}
                  disabled={isValidData}
                  onClick={() => {
                    dispatch(setContributor({ data: state }));
                    navigate({
                      pathname: `/fe-diplom/screening/${params.id}`,
                      search: location.search,
                    });
                  }}
                />
              </div>
            </div>
          ) : (
            <Info
              type="info"
              text="Вы не выбрали ни одного места в вагоне"
              onClick={() => navigate({
                pathname: `/fe-diplom/seats/${params.id}`,
                search: location.search,
              })}
            />
          )}
        </div>
      </div>
    </>
  );
};

// Screening Component
export const Screening = () => {
  const { passengers, contributor } = useSelector((state) => state.passengers);
  const { id } = useSelector((state) => state.catalogTrains);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [addOrder] = useAddOrderMutation();

  const progress = useCallback(() => {
    return {
      screening: passengers.length > 0 && !validateDataPassengers(contributor)
    };
  }, [passengers, contributor]);

  const paymentText = contributor.payment_method === "cash" ? "Наличными" : "Онлайн";

  const handleAddOrder = async () => {
    const dataTickets = passengers.map((item) => {
      const elem = {
        is_adult: item.seat.type === "adult",
        is_child: item.seat.type === "child",
        first_name: item.dataPass.info.first_name,
        last_name: item.dataPass.info.last_name,
        patronymic: item.dataPass.info.patronymic,
        gender: item.dataPass.info.gender === "male",
        birthday: item.dataPass.info.date_birth,
        document_type: item.dataPass.docs.type_docs.id === "passport" ? "паспорт" : "свидетельство о рождении",
        document_data: item.dataPass.docs.data_docs.seria
          ? item.dataPass.docs.data_docs.seria + item.dataPass.docs.data_docs.number
          : item.dataPass.docs.data_docs.number,
      };

      return {
        coach_id: item.coach_id,
        personInfo: elem,
        seat_number: item.seat.seats,
        include_children_seat: false,
      };
    });

    const body = JSON.stringify({
      user: contributor,
      departure: {
        route_direction_id: id,
        seats: dataTickets,
      },
    });

    await addOrder({ body });
  };

  const onClickHandler = async () => {
    await handleAddOrder();
    navigate({
      pathname: `/fe-diplom/order-result/${params.id}`,
      search: location.search,
    });
  };

  return (
    <>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="screening_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="screening-content">
          <ProgressBar data={progress()} />
          <SideBar />
          <section className="screening">
            <ScreenTrain />
            <ScreenPassengers data={passengers} />
            <ScreenPayment data={paymentText} />
            <div className="screening_block-control">
              <Button
                text="Подтвердить"
                type="next-block"
                onClick={onClickHandler}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// OrderResult Component
export const OrderResult = () => {
  const { first_name, patronymic } = useSelector(
    (state) => state.passengers.contributor
  );
  const totalPrice = useSelector((state) => state.passengers.totalPrice);
  
  const amount = Array(5).fill().map((_, i) => i + 1);

  return (
    <>
      <Banner
        className="banner banner-order-result_page"
        banner={banner_order_page}
      />
      {first_name && (
        <section className="order-result_wrap">
          <div className="order-result_block">
            <Title
              text="Благодарим Вас за заказ!"
              className="order-result_title"
            />
            <Card className="order-result">
              <CardTop className="order-result">
                <div className="order-result_number-wrap">
                  <span className="order_number">№Заказа 225AA</span>
                </div>
                <div className="order-result_price-wrap">
                  <span className="price_text">сумма </span>
                  <span className="price total-price">{totalPrice}</span>
                  <svg
                    className="order-result_price-currency"
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.00056 14.4061C5.00056 15.2125 5.00056 16.0029 5.00056 16.8029C7.08079 16.8029 9.15436 16.8029 11.2379 16.8029C11.2379 17.6062 11.2379 18.3998 11.2379 19.2062C9.16103 19.2062 7.08413 19.2062 5.00056 19.2062C5.00056 20.8095 5.00056 22.3999 5.00056 24C4.1638 24 3.33704 24 2.49695 24C2.49695 22.4063 2.49695 20.8127 2.49695 19.2126C1.66019 19.2126 0.83676 19.2126 0.00333371 19.2126C0.00333371 18.4094 0.00333371 17.6158 0.00333371 16.8093C0.830093 16.8093 1.65685 16.8093 2.48694 16.8093C2.48694 16.0061 2.48694 15.2157 2.48694 14.4125C1.66019 14.4125 0.833427 14.4125 0 14.4125C0 13.606 0 12.8124 0 12.0092C0.826759 12.0092 1.65352 12.0092 2.49028 12.0092C2.49028 8.00583 2.49028 4.01208 2.49028 0.0119368C2.54028 0.00873665 2.57362 0.00553653 2.61029 0.00553653C5.944 0.00553653 9.2777 -0.010464 12.6114 0.0119368C14.535 0.0247372 16.2085 0.699961 17.6153 1.96081C18.7954 3.01684 19.5555 4.30969 19.8556 5.83295C20.2723 7.95462 19.7855 9.89069 18.4187 11.606C17.482 12.7836 16.2585 13.5964 14.7917 14.0604C14.0749 14.2877 13.3382 14.4061 12.5847 14.4061C10.1078 14.4093 7.63419 14.4061 5.15724 14.4093C5.10724 14.4061 5.05723 14.4061 5.00056 14.4061ZM5.00389 2.40562C5.00389 5.61534 5.00389 8.80905 5.00389 12.006C5.04056 12.006 5.07057 12.006 5.10057 12.006C7.60085 12.006 10.1011 12.0124 12.6014 11.9996C12.9881 11.9964 13.3848 11.942 13.7582 11.8492C16.4018 11.1771 17.972 8.68105 17.3719 6.13056C16.8586 3.95448 14.8383 2.40562 12.5114 2.40562C10.0611 2.40562 7.61085 2.40562 5.16058 2.40562C5.11057 2.40562 5.06057 2.40562 5.00389 2.40562Z"
                      fill="#928F94"
                    />
                  </svg>
                </div>
              </CardTop>
              <CardBody className="order-result">
                <Puncts />
                <Appeal data={`${first_name} ${patronymic}`} />
              </CardBody>
              <CardBottom className="order-result">
                <ControlBlockFeedBack className="order-result" amount={amount} />
              </CardBottom>
            </Card>
          </div>
        </section>
      )}
    </>
  );
};

// NotFound Component
export const NotFound = () => {
  const navigate = useNavigate();
  const { nanoid } = require("nanoid");

  return (
    <section className="top-sales">
      <h2 className="text-center">Страница не найдена</h2>
      <p>Извините, такая страница не найдена!</p>
      <Button
        key={nanoid()}
        text="Вернуться на главную"
        onClick={() => navigate("/fe-diplom")}
      />
    </section>
  );
};

// Экспорт всех страниц
export default {
  HomePage,
  SelectionTrain,
  SelectionWagons,
  PassengersInfo,
  PersonalData,
  Screening,
  OrderResult,
  NotFound
};