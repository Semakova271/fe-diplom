import React, { useState } from "react";
import { useNavigate,useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setContributor } from "../../features/passengersSlice";
import Banner from "../ui/Banner";
import banner3 from "../../img/banner3.png";
import MainForm from "../Forms/MainForm";
import ProgressBar from "../ui/ProgressBar";
import Info from "../ui/Info";
import SideBar from "../ui/SideBar";
import PersonalDataForm from "../Forms/PersonalDataForm";
import ControlledCheckbox from "../MUI/ControlledCheckbox";
import { CardTitle, Button } from "../ui/Modules";
import "../ui/personalData.css";
import { validateDataPassengers } from "../../utils/formsValidator";
import { optionsPayment } from "../../utils/dataText";

const PersonalData = () => {
  const { loading } = useSelector((state) => state.catalogTrains);
  const { contributor, passengers } = useSelector((state) => state.passengers);
  const [state, setState] = useState(contributor);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const onChangeInput = (value, id) => {
    if (id === "last_name") {
      setState((prevState) => ({
        ...prevState,
        last_name: value,
      }));
    } else if (id === "first_name") {
      setState((prevState) => ({
        ...prevState,
        first_name: value,
      }));
    } else if (id === "patronymic") {
      setState((prevState) => ({
        ...prevState,
        patronymic: value,
      }));
    } else if (id === "phone") {
      setState((prevState) => ({
        ...prevState,
        phone: value,
      }));
    } else if (id === "e-mail") {
      setState((prevState) => ({
        ...prevState,
        email: value,
      }));
    }
  };

  const handleChange = (event) => {
    if (event.target.value === "on")
      setState((prevState) => ({
        ...prevState,
        payment_method: event.target.id,
      }));
  };
  const styledColor = (id, value) => {
    return id === value ? "#ffa800" : "inherit";
  };
  const isValidData = validateDataPassengers(state);

  return (
    <React.Fragment>
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
                      text={"Персональные данные"}
                      className="personal-data_block"
                    />
                  </div>
                  <PersonalDataForm data={state} onChange={onChangeInput} />
                </div>

                <div className="personal-data_payment">
                  <div
                    className="personal-data_block-top"
                    style={{
                      borderTop: "1px dashed #928F94",
                      borderBottom: "1px dashed #928F94",
                    }}
                  >
                    <CardTitle
                      text={"Способ оплаты"}
                      className="personal-data_block"
                    />
                  </div>
                  <div className="online-payment">
                    {" "}
                    <div className="payment-wrap">
                      <ControlledCheckbox
                        id="online"
                        value={state.payment_method}
                        onChange={handleChange}
                      />
                      <span
                        className="payment-description"
                        style={{
                          color: styledColor("online", state.payment_method),
                        }}
                      >
                        Онлайн
                      </span>
                    </div>
                    <div className="payment-options_block d-flex">
                      {optionsPayment.map((item) => {
                        return (
                          <span
                            key={item}
                            className="payment-options_block-item"
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="cash-payment" style={{ paddingTop: "58px" }}>
                    {" "}
                    <div className="payment-wrap">
                      <ControlledCheckbox
                        id="cash"
                        value={state.payment_method}
                        onChange={handleChange}
                      />
                      <span
                        className="payment-description"
                        style={{
                          color: styledColor("cash", state.payment_method),
                        }}
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
                  type={!isValidData ? "next-block" : " disabled next-block"}
                  disabled={isValidData ? true : false}
                  onClick={() => {
                    dispatch(setContributor({ data: state }));
                    navigate({
                      pathname: `/fe-diplom/screening/${params.id}`,
                      search: location.search,
                    })
                
                  }}
                ></Button>
              </div>
            </div>
          ) : (
            <Info
              type="info"
              text="Вы не выбрали ни одного места в вагоне "
              onClick={() =>
                navigate({
                  pathname: `/fe-diplom/seats/${params.id}`,
                  search: location.search,
                })
              }
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalData;