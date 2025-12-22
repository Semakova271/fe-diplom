import React, { useCallback } from "react";
import PassengersSelect from "./PassengersLableState";
import ControlledCheckbox from "../MUI/ControlledCheckbox";
import ControlledInput from "../MUI/ControlledInput";
import "./PassengersInfo.css";

const PassengersInfo = ({ state, setState }) => {
  const handleGenderClick = useCallback((newGender) => {
    if (newGender !== state.gender) {
      setState((prevState) => ({
        ...prevState,
        gender: newGender,
      }));
    }
  }, [state.gender, setState]);

  const handleInputChange = useCallback((value, id) => {
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, [setState]);

  const handleAgeChange = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      age: value,
    }));
  }, [setState]);

  return (
    <div className="passengers-info_form">
      {/* Выпадающий список возраста */}
      <div className="passengers-age_dropdown">
        <PassengersSelect
          type="age"
          id="age"
          setState={handleAgeChange}
          value={state.age}
          options={["Взрослый", "Детский"]}
          placeholder="Возраст"
        />
      </div>

      {/* Поля ФИО */}
      <div className="passengers-name_fields">
        <div className="name-field-group">
          <div className="field-label">Фамилия</div>
          <ControlledInput
            id="last_name"
            type="text"
            state={state.last_name}
            onChangeInput={handleInputChange}
            placeholder=""
            className="name-input-field"
          />
        </div>
        
        <div className="name-field-group">
          <div className="field-label">Имя</div>
          <ControlledInput
            id="first_name"
            type="text"
            state={state.first_name}
            onChangeInput={handleInputChange}
            placeholder=""
            className="name-input-field"
          />
        </div>
        
        <div className="name-field-group">
          <div className="field-label">Отчество</div>
          <ControlledInput
            id="patronymic"
            type="text"
            state={state.patronymic}
            onChangeInput={handleInputChange}
            placeholder=""
            className="name-input-field"
          />
        </div>
      </div>

      {/* Пол и Дата рождения */}
      <div className="passengers-gender_birthdate">
        <div className="gender-group">
          <div className="field-label">Пол</div>
          <div className="gender-buttons-united">
            <button
              className={`gender-btn-left ${state.gender === "male" ? "gender-active" : ""}`}
              onClick={() => handleGenderClick("male")}
            >
              М
            </button>
            <button
              className={`gender-btn-right ${state.gender === "female" ? "gender-active" : ""}`}
              onClick={() => handleGenderClick("female")}
            >
              Ж
            </button>
          </div>
        </div>
        
        <div className="birthdate-group">
          <div className="field-label">Дата рождения</div>
          <ControlledInput
            id="date_birth"
            type="date"
            state={state.date_birth}
            onChangeInput={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            className="birthdate-input-exact"
          />
        </div>
      </div>

      {/* Чекбокс ограниченная подвижность */}
      <div className="passengers-disabled_checkbox">
        <ControlledCheckbox />
        <span className="disabled-checkbox-text">
          ограниченная подвижность
        </span>
      </div>
    </div>
  );
};

export default PassengersInfo;