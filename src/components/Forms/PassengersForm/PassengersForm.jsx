import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PassengersInfo from "./PassengersInfo";
import PassengersDocs from "./PassengersDocs";
import { Button, MySvgIcon } from "../../Atoms/Atoms";
import {
  validateDataPassengers,
  validateInputForm,
} from "../../../utils/formsValidator";
import { setDataPassengers } from "../../../features/passengersSlice";
import icon_green_btn from "../../../img/passengers/icon_green_btn.svg";
import icon_error_docs from "../../../img/passengers/icon_error_docs.svg";

const PassengersForm = ({ id }) => {
  const [info, setInfo] = useState({
    id: id,
    gender: "male",
    age: "Взрослый",
    date_birth: "",
    first_name: "",
    last_name: "",
    patronymic: "",
  });
  const [docs, setDocs] = useState({
    type_docs: { id: "passport", description: "Паспорт РФ" },
    data_docs: { seria: "", number: "" },
  });
  const dispatch = useDispatch();
  const { passengers } = useSelector((state) => state.passengers);

  let isValidDocs;
  let basedStyledBackground;
  let errorDocs;
  useEffect(() => {
    let passenger = passengers.find((item) => {
     
   return item.dataPass ? item.dataPass.info.id === id:null;
    });

    if (passenger) {
      setInfo(passenger.dataPass.info);
      setDocs(passenger.dataPass.docs);
    }
  }, [id, passengers]); // eslint-disable-next-line
  const isValidData =
    validateDataPassengers(info) || validateDataPassengers(docs.data_docs)
      ? false
      : true;
  if (docs.type_docs.id === "certificate")
    isValidDocs = validateInputForm(docs.data_docs.number, "certificate");
  if (isValidDocs && isValidData) {
    errorDocs = false;
    basedStyledBackground = "#B2F6A1";
  } else if (
    !isValidDocs &&
    docs.type_docs.id === "certificate" &&
    docs.data_docs.number !== ""
  ) {
    errorDocs = true;
    basedStyledBackground = "rgba(255, 61, 0, 0.38)";
  } else if (docs.type_docs.id === "passport" && isValidData) {
    errorDocs = false;
    basedStyledBackground = "#B2F6A1";
  } else {
    errorDocs = false;
    basedStyledBackground = "inherit";
  }

  const onClickAddPass = () => {
    const dataInfo = info;
    dataInfo.type = dataInfo.age === "Взрослый" ? "adult" : "child";
    dispatch(setDataPassengers({ data: { info: dataInfo, docs } }));
  };
  return (
    <React.Fragment>
      <PassengersInfo state={info} setState={setInfo} />
      <div className="passengers-info_block-item_body_divider"></div>
      <PassengersDocs state={docs} setState={setDocs} errorDocs={errorDocs} />
      <div
        className="passengers-info_block_control"
        style={{ background: basedStyledBackground }}
      >
        {!errorDocs && (
          <div className="passengers-info_status-done">
            <MySvgIcon
              icon={icon_green_btn}
              type="pass"
              className="block_control_icon"
            />
            <span className="passengers-info_status-done_text">Готово</span>
          </div>
        )}
        {errorDocs && (
          <div className="passengers-info_status-error">
            <MySvgIcon
              icon={icon_error_docs}
              type="error_docs"
              className="block_control_icon"
            />
            <div className="passengers-info_error-message">
              <p className="passengers-info_error-text">
                Номер свидетельства указан некорректно
              </p>
              <p className="passengers-info_error-text">
                пример:<strong className="strong-text">VIII-ЫП-123456</strong>
              </p>
            </div>
          </div>
        )}
        {!errorDocs ? (
          <Button
            text="Следующий пассажир"
            type="next-passenger"
            onClick={onClickAddPass}
            disabled={!isValidData ? true : false}
          ></Button>
        ) : null}
      </div>
    </React.Fragment>
  );
};
export default PassengersForm;
