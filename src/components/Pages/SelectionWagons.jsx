import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Title } from "../ui/Modules";
import Banner from "../ui/Banner";
import banner3 from "../../img/banner3.png";
import MainForm from "../Forms/MainForm";
import SideBar from "../ui/SideBar";
import ProgressBar from "../ui/ProgressBar";
import Loader from "../ui/Loader";
import TrailDetails from "../ui/TrailDetails";
import QuantityTickets from "../ui/QuantityTickets";
import WagonsTypesBlock from "../ui/WagonsTypesBlock";
import SeatsDetails from "../ui/SeatsDetails";
import Info from "../ui/Info";
import { findWagon } from "../../utils/trainSelectionUtils";
import { getValidDataPass } from "../../utils/WagonSelectionUtils";
import { 
  addSeats, 
  setDataPassengers,
  updateAdultTicketsCount,
  updateChildTicketsCount,
  updatePassengersCount 
} from "../../features/passengersSlice"; 
import {
  setTrainId,
  setDataRequest,
  upDateCatalog,
  setSelectionTrain,
} from "../../features/catalogTrainsSlice";
import {
  useGetTrainIdQuery,
  useGetTrainsListQuery,
} from "../../features/myApi";
import {
  getDuration,
  parsedUrlString,
  formattedFormData,
} from "../../utils/trainSelectionUtils";
import "../ui/selectionWagons.css";

const SelectionWagons = () => {
  const params = useParams();
  const [selectedTypeWagon, setSelectedTypeWagon] = useState(null);
  const [selectedTypeTicket, setSelectedTypeTicket] = useState({
    type: "adult",
  });
  const { id, seleсtedTrain } = useSelector((state) => state.catalogTrains);
  const dataSeats = useSelector((state) => state.passengers.dataSeats);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Используем useMemo для upData и formData
  const upData = useMemo(() => parsedUrlString(location.search), [location.search]);
  
  const {
    data: list,
  } = useGetTrainsListQuery(upData);
  
  const {
    data = [],
    isError: isErrorId,
    isLoading: isLoadingId,
  } = useGetTrainIdQuery(params.id);
  
  // Используем useMemo для formData
  const formData = useMemo(() => formattedFormData(upData), [upData]);

  // Перенесем эту логику в useEffect
  useEffect(() => {
    if (!id) {
      dispatch(setDataRequest({ data: formData }));
      dispatch(setTrainId({ id: params.id }));
    }
  }, [id, dispatch, formData, params.id]);

  useEffect(() => {
    if (list && list.items && list.items.length > 0) {
      const trainIndex = list.items.findIndex(
        (item) => item?.departure?._id === params.id
      );
      
      if (trainIndex !== -1) {
        dispatch(setSelectionTrain({ data: list.items[trainIndex].departure }));
      }
    }
    
    dispatch(
      upDateCatalog({
        data: {
          formData,
          trainsParameters: upData?.parameters || {},
          parameters: upData?.filter || {},
        },
      })
    );
  }, [list, params.id, dispatch, formData, upData]);

  const onClickInfo = () => {
    document.querySelector(".info_card").classList.remove("active");
  };
  
  const clickSelectedSeats = useCallback((event) => {
    const seatNumber = Number(event.target.dataset.id);
    const coachId = event.target.dataset.wagon_id;
    const price = event.target.dataset.price;
    
    // Создаем объект места
    const seats = { 
      type: selectedTypeTicket.type, 
      seats: seatNumber,
      coach_id: coachId,
      price: price
    };
    
    // Добавляем место
    dispatch(addSeats({ data: seats, price: price }));
    
    // Обновляем данные пассажиров
    dispatch(
      setDataPassengers({
        data: {
          coach_id: coachId,
          seat: seats,
          price: price,
        },
      })
    );
    
    // Обновляем счетчики билетов
    if (selectedTypeTicket.type === "adult") {
      // Получаем текущее количество взрослых билетов
      const adultCount = dataSeats.find(item => item.type === "adult")?.count || 0;
      dispatch(updateAdultTicketsCount({ count: adultCount + 1 }));
    } else if (selectedTypeTicket.type === "child") {
      // Получаем текущее количество детских билетов
      const childCount = dataSeats.find(item => item.type === "child")?.count || 0;
      dispatch(updateChildTicketsCount({ count: childCount + 1 }));
    }
    
    // Обновляем общее количество пассажиров
    dispatch(updatePassengersCount());
    
    // Переключаем класс выбранного места
    event.target.classList.toggle("utils-wagon_button_selected");
  }, [dispatch, selectedTypeTicket.type, dataSeats]);

  // ИСПРАВЛЕННЫЙ БЛОК details с проверками
  const details = useMemo(() => {
    if (!seleсtedTrain || !seleсtedTrain.from || !seleсtedTrain.to) {
      return null;
    }
    
    const from = seleсtedTrain.from;
    const to = seleсtedTrain.to;
    
    // Проверяем наличие всех необходимых полей
    if (!from.datetime || !to.datetime) {
      return null;
    }
    
    return {
      duration: getDuration(
        to.datetime,
        from.datetime
      ),
      from: {
        name: from.city?.name || '',
        datetime: from.datetime * 1000,
        railway_station_name: from.railway_station_name || '',
      },
      to: {
        name: to.city?.name || '',
        datetime: to.datetime * 1000,
        railway_station_name: to.railway_station_name || '',
      },
    };
  }, [seleсtedTrain]);
  
  const isValidSeats = useMemo(() => getValidDataPass(dataSeats), [dataSeats]);
  
  const onChangeInput = useCallback((event) => {
    console.log(event, 11);
  }, []);
  
  // Если данные загружаются, показываем только лоадер
  if (isLoadingId) {
    return (
      <React.Fragment>
        <Banner className="banner banner-tickets" banner={banner3} />
        <div className="selection-wagons_wrapper">
          <MainForm className="search-tickets_form" />
          <Loader />
        </div>
      </React.Fragment>
    );
  }
  
  return (
    <React.Fragment>
      <Banner className="banner banner-tickets" banner={banner3} />

      <div className="selection-wagons_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="selection-wagon-content">
          {isErrorId && (
            <Info
              type={"error"}
              text={"Что-то пошло не так..."}
              onClick={onClickInfo}
            />
          )}
          {!isLoadingId && <ProgressBar />}
          {!isLoadingId && <SideBar />}
          {data && (
            <section className="selection-wagon_Block">
              <Title className={"selection-wagon_title"} text="Выбор мест" />

              {details && (
                <TrailDetails className="selection-wagon" data={details} />
              )}
              <QuantityTickets
                className="quantity-tickets"
                data={dataSeats}
                selected={selectedTypeTicket}
                setSelected={setSelectedTypeTicket}
                onChangeInput={onChangeInput}
              />
              <WagonsTypesBlock
                className="wagons-type"
                selectedType={selectedTypeWagon}
                setSelectedType={setSelectedTypeWagon}
              />
              {selectedTypeWagon ? (
                <SeatsDetails
                  className="available-seats-details"
                  data={findWagon(data, selectedTypeWagon)}
                  selectedTypeTicket={selectedTypeTicket}
                  onClick={(event) => clickSelectedSeats(event, selectedTypeTicket)}
                />
              ) : null}
              <div className="selection-wagon-content_control">
                <Button
                  text="Далее"
                  type="next-block"
                  disabled={!isValidSeats.length}
                  onClick={() => navigate({
                    pathname: `/fe-diplom/passengers/${id}`,
                    search: location.search,
                  })}
                ></Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SelectionWagons;