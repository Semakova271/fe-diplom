import React from "react";
import PassengersLableState from "./PassengersLableState";
import ControlledCheckbox from "../iu/MUI/ControlledCheckbox";
import ControlledInput from "../iu/MUI/ControlledInput";

const PassengersInfo = ({ state, setState }) => {
  const clickHandler = (event) => {
    if (event.target.id === state.gender) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      gender: event.target.id === "male" ? "male" : "female",
    }));
  };

  const onChangeInput = (value, id) => {
    if (id === "last_name")
      setState((prevState) => ({
        ...prevState,
        last_name: value,
      }));
    if (id === "first_name")
      setState((prevState) => ({
        ...prevState,
        first_name: value,
      }));
    if (id === "patronymic")
      setState((prevState) => ({
        ...prevState,
        patronymic: value,
      }));
    if (id === "date_birth")
      setState((prevState) => ({
        ...prevState,
        date_birth: value,
      }));
    if (id === "age")
      setState((prevState) => ({
        ...prevState,
        age: value,
      }));
  };
  
  return (
    <div className="form passengers-data_form">
      <div className="passengers-data_type">
        <PassengersLableState
          type="age"
          id="age"
          setState={onChangeInput}
          value={state.age}
          options={["��������", "�������"]}
        />
      </div>

      <div className="passengers-data_fullname">
        <div className="form-group group-fullname">
          <label
            htmlFor="exampleFormControlInput1"
            className="passengers-data_fullname_label"
          >
            �������
          </label>
          <ControlledInput
            id="last_name"
            type="text"
            state={state.last_name}
            onChangeInput={onChangeInput}
          />
        </div>
        <div className="form-group group-fullname">
          <label
            htmlFor="exampleFormControlInput2"
            className="passengers-data_fullname_label"
          >
            ���
          </label>
          <ControlledInput
            id="first_name"
            type="text"
            state={state.first_name}
            onChangeInput={onChangeInput}
          />
        </div>
        <div className="form-group group-fullname">
          <label
            htmlFor="exampleFormControlInput3"
            className="passengers-data_fullname_label"
          >
            ��������
          </label>
          <ControlledInput
            id="patronymic"
            type="text"
            state={state.patronymic}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>
      <div className="passengers-data_gender_&_birthdate">
        <div className="form-group group-gender">
          <label
            htmlFor="exampleFormControlInput1"
            className="passengers-data_gender_label"
          >
            ���
          </label>
          <div
            className="btn-group"
            role="group"
            aria-label="btn-group gender_&_birthdate"
          >
            <button
              id="male"
              type="button"
              className={
                state.gender === "male"
                  ? "btn btn-gender gender-active"
                  : "btn btn-gender"
              }
              onClick={clickHandler}
            >
              M
            </button>

            <button
              id="female"
              type="button"
              className={
                state.gender === "female"
                  ? "btn btn-gender gender-active"
                  : "btn btn-gender"
              }
              onClick={clickHandler}
            >
              �
            </button>
          </div>
        </div>
        <div className="form-group group-birthdate">
          <label
            htmlFor="exampleFormControlInput5"
            className="passengers-data_birthdate_label"
          >
            ���� ��������
          </label>
          <ControlledInput
            id="date_birth"
            type="date"
            state={state.date_birth}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>
      <div className="passengers-data_disabled-person">
        <ControlledCheckbox />
        <span className="passengers-data_disabled-person_text">
          ������������ �����������
        </span>
      </div>
    </div>
  );
};

export default PassengersInfo;