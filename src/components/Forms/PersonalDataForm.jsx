import React from "react";
import ControlledInput from "../Molecules/MUI/ControlledInput";

const PersonalDataForm = ({ data, onChange }) => {

  return (
    <React.Fragment>
      <div className="form personal-data_form">
        <div className="passengers-data_fullname" style={{ margin: 0 }}>
          <div className="form-group group-fullname">
            <label
              htmlFor="exampleFormControlInput1"
              className="passengers-data_fullname_label"
              style={{ color: "#292929" }}
            >
              Фамилия
            </label>
            <ControlledInput
              type="text"
              id="last_name"
              state={data.last_name}
              onChangeInput={onChange}
            />
          </div>
          <div className="form-group group-fullname">
            <label
              htmlFor="exampleFormControlInput2"
              className="passengers-data_fullname_label"
              style={{ color: "#292929" }}
            >
              Имя
            </label>
            <ControlledInput
              type="text"
              id={"first_name"}
              state={data.first_name}
              onChangeInput={onChange}
            />
          </div>
          <div className="form-group group-fullname">
            <label
              htmlFor="exampleFormControlInput3"
              className="passengers-data_fullname_label"
              style={{ color: "#292929" }}
            >
              Отчество
            </label>
            <ControlledInput
              type="text"
              id="patronymic"
              state={data.patronymic}
              onChangeInput={onChange}
            />
          </div>
        </div>
        <div className="group-contacns">
          <div className="form-group group-contacts">
            <label
              htmlFor="exampleFormControlInputPhone"
              className="passengers-data_fullname_label"
              style={{ color: "#292929" }}
            >
              Контактный телефон
            </label>
            <ControlledInput
              type="text"
              id="phone"
              state={data.phone}
              onChangeInput={onChange}
            />
          </div>
          <div className="form-group group-contacts">
            <label
              htmlFor="exampleFormControlInputEmail"
              className="passengers-data_fullname_label"
              style={{ color: "#292929" }}
            >
              E-mail
            </label>
            <ControlledInput
              type="text"
              id="e-mail"
              state={data.email}
              onChangeInput={onChange}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalDataForm;