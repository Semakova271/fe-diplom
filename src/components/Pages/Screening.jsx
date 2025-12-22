import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../ui/Modules";
import Banner from "../ui/Banner";
import banner3 from "../../img/banner3.png";
import MainForm from "../Forms/MainForm";
import SideBar from "../ui/SideBar";
import ProgressBar from "../ui/ProgressBar";
import ScreenTrain from "../ui/ScreenTrain";
import ScreenPassengers from "../ui/ScreenPassengers";
import ScreenPayment from "../ui/ScreenPayment";
import { validateDataPassengers } from "../../utils/formsValidator";
import { useAddOrderMutation } from "../../features/otherApi";
import "../ui/screening.css";
import "../ui/ScreeningCommon.css"; 

const Screening = () => {
  const { passengers, contributor } = useSelector((state) => state.passengers);
  const { id } = useSelector((state) => state.catalogTrains);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [addOrder /*result, isError*/] = useAddOrderMutation();
  
  let progress = useCallback(() => {
    console.log("Passengers data:", passengers);
    return {};
  }, [passengers]);

  useEffect(() => {
    progress();
    progress.screening =
      passengers.length > 0 && !validateDataPassengers(contributor)
        ? true
        : false;
  }, [progress, passengers, contributor]);

  const paymentText =
    contributor?.payment_method === "cash" ? "Наличными" : 
    contributor?.payment_method === "online" ? "Онлайн" : "Не указан";

  const handleAddOrder = async () => {
    if (dataTickets.length > 0) {
      await addOrder({ body });
    }
  };

  const onClickHandler = async () => {
    await handleAddOrder();
    navigate({
      pathname: `/fe-diplom/order-result/${params.id}`,
      search: location.search,
    });
  };

  // ФИКС: Более детальная проверка данных пассажиров
  const isValidPassenger = (passenger) => {
    if (!passenger || typeof passenger !== 'object') return false;
    
    // Проверяем базовую структуру
    const hasDataPass = passenger.dataPass && typeof passenger.dataPass === 'object';
    const hasInfo = hasDataPass && passenger.dataPass.info && typeof passenger.dataPass.info === 'object';
    
    // Проверяем обязательные поля
    if (!hasInfo) return false;
    
    const info = passenger.dataPass.info;
    const hasRequiredFields = info.first_name && info.last_name;
    
    return hasRequiredFields;
  };

  // ФИКС: Создаем dataTickets только для валидных пассажиров
  const validPassengers = Array.isArray(passengers) 
    ? passengers.filter(isValidPassenger)
    : [];

  const dataTickets = validPassengers.map((item) => {
    const info = item.dataPass.info;
    const docs = item.dataPass.docs || {};
    const dataDocs = docs.data_docs || {};
    
    const elem = {
      is_adult: item.seat?.type === "adult" || false,
      is_child: item.seat?.type === "child" || false,
      first_name: info.first_name || "",
      last_name: info.last_name || "",
      patronymic: info.patronymic || "",
      gender: info.gender === "male" || false,
      birthday: info.date_birth || "",
      document_type: docs.type_docs?.id === "passport" 
        ? "паспорт" 
        : "свидетельство о рождении",
      document_data: dataDocs.seria 
        ? `${dataDocs.seria || ""}${dataDocs.number || ""}`
        : dataDocs.number || "",
    };

    return {
      coach_id: item.coach_id || "",
      personInfo: elem,
      seat_number: item.seat?.seats || "",
      include_children_seat: false,
    };
  });

  console.log("Valid passengers:", validPassengers);
  console.log("Data tickets:", dataTickets);
  
  const body = JSON.stringify({
    user: contributor || {},
    departure: {
      route_direction_id: id || "",
      seats: dataTickets,
    },
  });

  return (
    <React.Fragment>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="screening_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="screening-content">
          <ProgressBar data={progress} />
          <SideBar />
          <section className="screening">
            <ScreenTrain />
            <ScreenPassengers data={validPassengers} />
            <ScreenPayment data={paymentText} />
            <div className="screening_block-control">
              <Button
                text="Подтвердить"
                type="next-block"
                disabled={validPassengers.length === 0}
                onClick={onClickHandler}
              ></Button>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Screening;