import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../Atoms/Atoms";
import Banner from "../Molecules/Banner";
import banner3 from "../../img/banner/banner3.png";
import MainForm from "../Forms/MainForm";
import SideBar from "../SideBar/SideBar";
import ProgressBar from "../Molecules/ProgressBar";
import ScreenTrain from "../Main/Screening/ScreenTrain";
import ScreenPassengers from "../Main/Screening/ScreenPassengers";
import ScreenPayment from "../Main/Screening/ScreenPayment";
import { validateDataPassengers } from "../../utils/formsValidator";
import { useAddOrderMutation } from "../../features/otherApi";
import "../Main/Screening/screening.css";

const Screening = () => {
  const { passengers, contributor } = useSelector((state) => state.passengers);
  const { id } = useSelector((state) => state.catalogTrains);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [addOrder /*result, isError*/] = useAddOrderMutation();
  let progress = useCallback(() => {
    console.log(passengers);
    return {};
  }, [passengers]);

  useEffect(() => {
    progress();
    progress.screening =
      passengers.length > 0 && !validateDataPassengers(contributor)
        ? true
        : false;
    //console.log(addOrder, result, isError, "addOrder");
  }, [progress, passengers, contributor]);

  const paymentText =
    contributor.payment_method === "cash" ? "Наличными" : "Онлайн";
  const handleAddOrder = async () => {
    await addOrder({ body });
  };

  const onClickHandler = async () => {
    await handleAddOrder();
    navigate({
      pathname: `/fe-diplom/order-result/${params.id}`,
      search: location.search,
    });
  };

  const dataTickets = passengers.map((item) => {
    const elem = {
      is_adult: item.seat.type === "adult" ? true : false,
      is_child: item.seat.type === "child" ? true : false,
      first_name: item.dataPass.info.first_name,
      last_name: item.dataPass.info.last_name,
      patronymic: item.dataPass.info.patronymic,
      gender: item.dataPass.info.gender === "male" ? true : false,
      birthday: item.dataPass.info.date_birth,
      document_type:
        item.dataPass.docs.type_docs.id === "passport"
          ? "паспорт"
          : "свидетельство о рождении",
      document_data: item.dataPass.docs.data_docs.seria
        ? item.dataPass.docs.data_docs.seria +
          item.dataPass.docs.data_docs.number
        : item.dataPass.docs.data_docs.number,
    };

    const ticket = {
      coach_id: item.coach_id,
      personInfo: elem,

      seat_number: item.seat.seats,
      include_children_seat: false,
    };
    return ticket;
  });

  console.log(dataTickets, "dataTickets ");
  const body = JSON.stringify({
    user: contributor,
    departure: {
      route_direction_id: id,
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
            <ScreenPassengers data={passengers} />
            <ScreenPayment data={paymentText} />
            <div className="screening_block-control">
              <Button
                text="Подтвердить"
                type="next-block"
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