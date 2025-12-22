import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PassengersInfo from "./PassengersInfo";
import PassengersDocs from "./PassengersDocs";
import { Button } from "../ui/Modules";
import {
  validateDataPassengers,
  validateInputForm,
} from "../../utils/formsValidator";
import { setDataPassengers } from "../../features/passengersSlice";
import "./PassengersForm.css";

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

  const passenger = useMemo(() => 
    passengers.find((item) => 
      item.dataPass?.info?.id === id
    ), [passengers, id]
  );

  useEffect(() => {
    if (passenger?.dataPass) {
      setInfo(passenger.dataPass.info);
      setDocs(passenger.dataPass.docs);
    }
  }, [passenger]);

  const isValidData = useMemo(() => 
    !validateDataPassengers(info) && !validateDataPassengers(docs.data_docs),
    [info, docs.data_docs]
  );

  const isValidDocs = useMemo(() => {
    if (docs.type_docs.id === "certificate") {
      return validateInputForm(docs.data_docs.number, "certificate");
    }
    return true;
  }, [docs.type_docs.id, docs.data_docs.number]);

  const errorDocs = useMemo(() => {
    if (docs.type_docs.id === "certificate") {
      return !isValidDocs && docs.data_docs.number !== "";
    }
    return false;
  }, [isValidDocs, docs.type_docs.id, docs.data_docs.number]);

  const onClickAddPass = useCallback(() => {
    const dataInfo = {
      ...info,
      type: info.age === "Взрослый" ? "adult" : "child"
    };
    dispatch(setDataPassengers({ 
      data: { 
        info: dataInfo, 
        docs 
      } 
    }));
  }, [dispatch, info, docs]);

  // Общая валидность формы
  const isFormValid = useMemo(() => {
    return isValidData && (docs.type_docs.id === "passport" || isValidDocs);
  }, [isValidData, isValidDocs, docs.type_docs.id]);

  return (
    <div className="passengers-form">
      <div className="passengers-form_header">
        <div className="passenger-number">Пассажир {id}</div>
        <div className="passenger-type">{info.age}</div>
      </div>
      
      <PassengersInfo 
        state={info} 
        setState={setInfo} 
      />
      
      <div className="passengers-form_divider"></div>
      
      <div className="passengers-docs_wrapper">
        <PassengersDocs 
          state={docs} 
          setState={setDocs} 
          errorDocs={errorDocs}
        />
      </div>
      
      <div className="passengers-form_control">
        <Button
          text="Следующий пассажир"
          type="next-passenger"
          onClick={onClickAddPass}
          disabled={!isFormValid}
          className="next-passenger-btn"
        />
      </div>
    </div>
  );
};

export default PassengersForm;