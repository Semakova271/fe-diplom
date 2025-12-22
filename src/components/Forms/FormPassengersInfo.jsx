import React, { useState, useCallback } from "react";
import PassengersLableState from "./PassengersLableState";
import ControlledCheckbox from "../Molecules/MUI/ControlledCheckbox";
import ControlledInput from "../Molecules/MUI/ControlledInput";
import "./FormPassengersInfo.css"; 

const FormPassengersInfo = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("Взрослый");
  const [dateBirth, setDateBirth] = useState("");
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [surName, setSurName] = useState("");

  // ✅ Оптимизация обработчика клика по полу
  const handleGenderClick = useCallback((event) => {
    const newGender = event.target.id;
    if (newGender !== gender) {
      setGender(newGender);
    }
  }, [gender]);

  return (
    <div className="form passengers-data_form">
      <div className="passengers-data_type">
        <PassengersLableState
          type="age"
          state={age}
          setState={setAge}
          options={["Взрослый", "Детский"]}
        />
      </div>

      <div className="passengers-data_fullname">
        <div className="form-group group-fullname">
          <label
            htmlFor="surnameInput"
            className="passengers-data_fullname_label"
          >
            Фамилия
          </label>
          <ControlledInput
            type="text"
            state={surName}
            setState={setSurName}
            id="surnameInput"
          />
        </div>
        <div className="form-group group-fullname">
          <label
            htmlFor="nameInput"
            className="passengers-data_fullname_label"
          >
            Имя
          </label>
          <ControlledInput
            type="text"
            state={name}
            setState={setName}
            id="nameInput"
          />
        </div>
        <div className="form-group group-fullname">
          <label
            htmlFor="patronymicInput"
            className="passengers-data_fullname_label"
          >
            Отчество
          </label>
          <ControlledInput
            type="text"
            state={secondName}
            setState={setSecondName}
            id="patronymicInput"
          />
        </div>
      </div>
      
      <div className="passengers-data_gender_birthdate">
        <div className="form-group group-gender">
          <label className="passengers-data_gender_label">
            Пол
          </label>
          <div className="btn-group" role="group" aria-label="Выбор пола">
            <button
              id="male"
              type="button"
              className={`btn btn-gender ${gender === "male" ? "gender-active" : ""}`}
              onClick={handleGenderClick}
            >
              М
            </button>
            <button
              id="female"
              type="button"
              className={`btn btn-gender ${gender === "female" ? "gender-active" : ""}`}
              onClick={handleGenderClick}
            >
              Ж
            </button>
          </div>
        </div>
        <div className="form-group group-birthdate">
          <label
            htmlFor="birthDateInput"
            className="passengers-data_birthdate_label"
          >
            Дата рождения
          </label>
          <ControlledInput
            type="date"
            state={dateBirth}
            setState={setDateBirth}
            id="birthDateInput"
          />
        </div>
      </div>
      
      <div className="passengers-data_disabled-person">
        <ControlledCheckbox />
        <span className="passengers-data_disabled-person_text">
          Ограниченная подвижность
        </span>
      </div>
    </div>
  );
};

export default FormPassengersInfo;