import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LocationOn } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Компоненты
import ControlledInput from "../Molecules/MUI/ControlledInput";
import ControlledCheckbox from "../Molecules/MUI/ControlledCheckbox";
import FormCalendar from "../Molecules/ReactCalendar";
import { Title, Button, CardTitle, MySvgIcon } from "../Atoms/Atoms";
import Info from "../Molecules/Info";

// API и утилиты
import { useGetCityesNameQuery } from "../../features/myApi";
import { validateInputForm, validateDataPassengers } from "../../utils/formsValidator";
import { addSubscriber, setDataPassengers } from "../../features/passengersSlice";
import { inputValue, setReverseData } from "../../features/formTicketsSlice";
import { setDataRequest, setParameters } from "../../features/catalogTrainsSlice";
import { capitalizeFirstLetter, getUrlSearch } from "../../utils/trainSelectionUtils";

// Изображения
import ic_arrow from "../../img/ic_arrow.svg";
import icon_green_btn from "../../img/passengers/icon_green_btn.svg";
import icon_error_docs from "../../img/passengers/icon_error_docs.svg";

// Стили для MUI компонентов
const useAutocompleteStyles = makeStyles({
  customStyle: {
    "& .MuiOutlinedInput-root": {
      height: 50,
      paddingBottom: 13,
      "& input": { height: 15 },
      "& fieldset": { height: 50 },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa800",
        borderWidth: "2px",
      },
    },
  },
});

// ========== КОМПОНЕНТЫ ДЛЯ ПАССАЖИРОВ ==========

// Компонент выбора с автодополнением
const PassengersSelect = ({
  id,
  value,
  setState,
  options,
  popupIcon,
  placeholder,
}) => {
  const classes = useAutocompleteStyles();
  const width = id === "certificate" ? 444 : 280;

  return (
    <Autocomplete
      className={classes.customStyle}
      id={id}
      onChange={(event, newValue) => setState(newValue, id)}
      popupIcon={popupIcon || null}
      options={options}
      placeholder={placeholder}
      value={value}
      sx={{ width }}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
    />
  );
};

// Компонент информации о пассажире
export const PassengersInfo = ({ state, setState }) => {
  const handleGenderClick = (event) => {
    const newGender = event.target.id === "male" ? "male" : "female";
    if (state.gender !== newGender) {
      setState(prev => ({ ...prev, gender: newGender }));
    }
  };

  const handleInputChange = (value, id) => {
    setState(prev => ({ ...prev, [id]: value }));
  };

  const formFields = [
    { id: "last_name", label: "Фамилия", type: "text" },
    { id: "first_name", label: "Имя", type: "text" },
    { id: "patronymic", label: "Отчество", type: "text" }
  ];

  return (
    <div className="passengers-data_form">
      <div className="passengers-data_type">
        <PassengersSelect
          type="age"
          id="age"
          setState={handleInputChange}
          value={state.age}
          options={["Взрослый", "Детский"]}
        />
      </div>

      <div className="passengers-data_fullname">
        {formFields.map(({ id, label, type }) => (
          <div key={id} className="form-group group-fullname">
            <label className="passengers-data_fullname_label">{label}</label>
            <ControlledInput
              id={id}
              type={type}
              state={state[id]}
              onChangeInput={handleInputChange}
            />
          </div>
        ))}
      </div>

      <div className="passengers-data_gender_&_birthdate">
        <div className="form-group group-gender">
          <label className="passengers-data_gender_label">Пол</label>
          <div className="btn-group" role="group">
            {["male", "female"].map(gender => (
              <button
                key={gender}
                id={gender}
                type="button"
                className={`btn btn-gender ${state.gender === gender ? 'gender-active' : ''}`}
                onClick={handleGenderClick}
              >
                {gender === "male" ? "M" : "Ж"}
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-group group-birthdate">
          <label className="passengers-data_birthdate_label">Дата рождения</label>
          <ControlledInput
            id="date_birth"
            type="date"
            state={state.date_birth}
            onChangeInput={handleInputChange}
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

// Компонент документов пассажира
export const PassengersDocs = ({ state, setState, errorDocs }) => {
  const handleDocTypeChange = (value, id) => {
    const doc_id = value === "Паспорт РФ" ? "passport" : "certificate";
    setState(prev => ({
      ...prev,
      type_docs: { id: doc_id, description: value },
      data_docs: { seria: "", number: "" }
    }));
  };

  const handleDocInputChange = (value, id, type) => {
    if (type === "certificate" && id === "number") {
      setState(prev => ({ ...prev, data_docs: { number: value } }));
    } else if (type === "passport") {
      setState(prev => ({
        ...prev,
        data_docs: { 
          seria: id === "seria" ? value : prev.data_docs.seria, 
          number: id === "number" ? value : prev.data_docs.number 
        }
      }));
    }
  };

  return (
    <div className="form passengers-docs_form">
      <div className="passengers-data_docs">
        <div className="passengers-data_type">
          <label className="passengers-data_document_label">Тип документа</label>
          <PassengersSelect
            id={state.type_docs.id}
            type={state.type_docs.id}
            setState={handleDocTypeChange}
            value={state.type_docs.description}
            options={["Паспорт РФ", "Свидетельство о рождении"]}
          />
        </div>

        {state.type_docs.id === "passport" && (
          <div className="form-group group_document-range">
            <label className="passengers-data_document_label">Серия</label>
            <ControlledInput
              id="seria"
              type={state.type_docs.id}
              state={state.data_docs.seria}
              onChangeInput={handleDocInputChange}
            />
          </div>
        )}

        <div className="form-group group_document-number">
          <label className="passengers-data_document_label">Номер</label>
          <ControlledInput
            id="number"
            errorDocs={errorDocs}
            type={state.type_docs.id}
            state={state.data_docs.number}
            onChangeInput={handleDocInputChange}
          />
        </div>
      </div>
    </div>
  );
};

// Главный компонент формы пассажира
export const PassengersForm = ({ id }) => {
  const [info, setInfo] = useState({
    id,
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
  const { passengers } = useSelector(state => state.passengers);

  // Загрузка данных пассажира
  useEffect(() => {
    const passenger = passengers.find(item => 
      item.dataPass ? item.dataPass.info.id === id : null
    );
    
    if (passenger) {
      setInfo(passenger.dataPass.info);
      setDocs(passenger.dataPass.docs);
    }
  }, [id, passengers]);

  // Валидация данных
  const isValidData = !validateDataPassengers(info) && !validateDataPassengers(docs.data_docs);
  
  const isCertificate = docs.type_docs.id === "certificate";
  const certificateValid = isCertificate 
    ? validateInputForm(docs.data_docs.number, "certificate")
    : true;

  const isValidDocs = isCertificate ? certificateValid : true;
  
  const hasErrorDocs = isCertificate && !certificateValid && docs.data_docs.number !== "";
  
  const getBackgroundStyle = () => {
    if (hasErrorDocs) return "rgba(255, 61, 0, 0.38)";
    if (isValidData && isValidDocs) return "#B2F6A1";
    return "inherit";
  };

  const handleAddPassenger = () => {
    const passengerData = {
      ...info,
      type: info.age === "Взрослый" ? "adult" : "child"
    };
    dispatch(setDataPassengers({ data: { info: passengerData, docs } }));
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <>
      <PassengersInfo state={info} setState={setInfo} />
      <div className="passengers-info_block-item_body_divider" />
      <PassengersDocs state={docs} setState={setDocs} errorDocs={hasErrorDocs} />
      
      <div className="passengers-info_block_control" style={{ background: backgroundStyle }}>
        {!hasErrorDocs && isValidData && (
          <div className="passengers-info_status-done">
            <MySvgIcon
              icon={icon_green_btn}
              type="pass"
              className="block_control_icon"
            />
            <span className="passengers-info_status-done_text">Готово</span>
          </div>
        )}
        
        {hasErrorDocs && (
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
                пример: <strong className="strong-text">VIII-ЫП-123456</strong>
              </p>
            </div>
          </div>
        )}
        
        {!hasErrorDocs && (
          <Button
            text="Следующий пассажир"
            type="next-passenger"
            onClick={handleAddPassenger}
            disabled={!isValidData}
          />
        )}
      </div>
    </>
  );
};

// ========== ОСНОВНЫЕ ФОРМЫ ==========

// Компонент выбора города
const CitySelect = ({ value, onChangeInput, placeholder, options }) => {
  const classes = useAutocompleteStyles();
  
  return (
    <Autocomplete
      className={classes.customStyle}
      options={options}
      value={value}
      onChange={(event, newValue) => {
        onChangeInput({ target: { value: newValue?.name || "" } });
      }}
      getOptionLabel={(option) => option.name || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          onChange={onChangeInput}
        />
      )}
    />
  );
};

// Форма личных данных
export const PersonalDataForm = ({ data, onChange }) => {
  const fields = [
    { id: "last_name", label: "Фамилия", type: "text" },
    { id: "first_name", label: "Имя", type: "text" },
    { id: "patronymic", label: "Отчество", type: "text" }
  ];

  const contactFields = [
    { id: "phone", label: "Контактный телефон", type: "text" },
    { id: "email", label: "E-mail", type: "text" }
  ];

  return (
    <div className="form personal-data_form">
      <div className="passengers-data_fullname personal-data_fullname">
        {fields.map(({ id, label, type }) => (
          <div key={id} className="form-group group-fullname">
            <label className="passengers-data_fullname_label personal-data_label">
              {label}
            </label>
            <ControlledInput
              type={type}
              id={id}
              state={data[id]}
              onChangeInput={onChange}
            />
          </div>
        ))}
      </div>
      
      <div className="group-contacns">
        {contactFields.map(({ id, label, type }) => (
          <div key={id} className="form-group group-contacts">
            <label className="passengers-data_fullname_label personal-data_label">
              {label}
            </label>
            <ControlledInput
              type={type}
              id={id}
              state={data[id]}
              onChangeInput={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Форма подписки
export const FormSubscribe = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (validateInputForm(email, "email")) {
      dispatch(addSubscriber({ data: email }));
      
      fetch("https://students.netoservices.ru/fe-diplom/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }, [email, dispatch]);

  const handleChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <form className="form-row form-subscribe" onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control subscribe__input"
        placeholder="e-mail"
        value={email}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-transparent subscribe__btn">
        Отправить
      </button>
    </form>
  );
};

// Боковая панель с календарями
export const FormSideBar = () => {
  const { from, to } = useSelector((state) => state.formTickets.formData);

  return (
    <div className="form-sidebar-block">
      <div className="form-sidebar-block_departure">
        <CardTitle
          className="form-sidebar-block_departure"
          text="Дата поездки"
        />
        <FormCalendar
          className="sidebar_form"
          value={from.date ? new Date(from.date) : null}
        />
      </div>
      
      <div className="form-sidebar-block_arrival">
        <CardTitle
          className="form-sidebar-block_arrival"
          text="Дата возвращения"
        />
        <FormCalendar
          className="sidebar_form"
          value={to.date ? new Date(to.date) : null}
        />
      </div>
    </div>
  );
};

// Главная форма поиска
export const MainForm = ({ className }) => {
  const { name } = useSelector((state) => state.formTickets);
  const { from, to } = useSelector((state) => state.formTickets.formData);
  const { parameters, trainsParameters } = useSelector(
    (state) => state.catalogTrains.searchData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { data = [], isError } = useGetCityesNameQuery(name);

  const optionsData = data.map(item => ({
    ...item,
    name: capitalizeFirstLetter(item.name)
  }));

  const formData = {
    from_city_id: from.city._id,
    from_city_name: from.city.name,
    to_city_id: to.city._id,
    to_city_name: to.city.name,
    date_start: from.date,
    date_end: to.date,
  };

  const filterData = {
    sort: parameters.sort.type,
    limit: parameters.limit,
    offset: parameters.offset,
  };

  const searchOptions = { value: name };
  const urlSearchString = getUrlSearch(searchOptions, formData, filterData, trainsParameters);

  const handleReverse = useCallback(() => {
    dispatch(setReverseData());
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    dispatch(setDataRequest({ data: { from, to } }));
    dispatch(setParameters({ offset: 0 }));
    
    if (location.pathname !== `/fe-diplom/trains/${urlSearchString}`) {
      navigate({
        pathname: `/fe-diplom/trains/`,
        search: `${urlSearchString}`,
      });
    }
  }, [dispatch, from, to, location.pathname, urlSearchString, navigate]);

  const handleInputChange = useCallback((event) => {
    if (event.target.value !== "") {
      dispatch(inputValue({ name: event.target.value }));
    }
  }, [dispatch]);

  const handleInfoClick = useCallback(() => {
    document.querySelector(".error_card")?.classList.remove("active");
  }, []);

  const isFormValid = from.city.name && to.city.name && from.date;

  return (
    <div className={className}>
      <div className={`${className}_destination`}>
        <Title
          className={`${className}_departure_title`}
          text="Направление"
        />
        <div className="form-group group-city-name">
          <CitySelect
            popupIcon={<LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />}
            value={{ name: from.city.name }}
            onChangeInput={handleInputChange}
            placeholder="Откуда"
            options={optionsData}
          />
          
          <button
            type="button"
            className="btn btn-transparent p-0 form_reverse-button"
            onClick={handleReverse}
          >
            <img className="ic_arrow_form" src={ic_arrow} alt="arrow icon" />
          </button>
          
          <CitySelect
            value={{ name: to.city.name }}
            popupIcon={<LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />}
            onChangeInput={handleInputChange}
            placeholder="Куда"
            options={optionsData}
          />
        </div>
      </div>

      <div className={`${className}_date-trails`}>
        <Title className={`${className}_departure_title`} text="Дата" />
        <div className="form-group group-date-trails">
          <FormCalendar
            value={from.date ? new Date(from.date) : null}
            type="startDate"
          />
          <FormCalendar
            value={to.date ? new Date(to.date) : null}
            type="finishDate"
          />
        </div>
      </div>

      <div className={`${className}_control`}>
        <Button
          text="Найти билеты"
          type="main_form"
          onClick={handleSearch}
          disabled={!isFormValid}
        />
        
        {isError && location.pathname === "/fe-diplom" && (
          <Info
            type="error"
            text="Что-то пошло не так, обновите страницу..."
            onClick={handleInfoClick}
          />
        )}
      </div>
    </div>
  );
};

// Устаревший компонент (оставлен для обратной совместимости)
export const FormPassengersInfo = () => {
  const [state, setState] = useState({
    gender: "male",
    age: "Взрослый",
    date_birth: "",
    first_name: "",
    last_name: "",
    patronymic: "",
  });

  return <PassengersInfo state={state} setState={setState} />;
};

// Экспорт всех компонентов
export default {
  PersonalDataForm,
  FormSubscribe,
  FormSideBar,
  MainForm,
  FormPassengersInfo,
  PassengersInfo,
  PassengersDocs,
  PassengersForm,
};