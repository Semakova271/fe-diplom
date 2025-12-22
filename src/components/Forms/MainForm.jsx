import React, { useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetCityesNameQuery } from "../../features/myApi";
import ControllableStates from "../MUI/ControllableStates";
import { LocationOn } from "@mui/icons-material";
import { Title, Button } from "../ui/Modules";
import Info from "../ui/Info";
import FormCalendar from "../ui/Calendar";
import {
  capitalizeFirstLetter,
  getUrlSearch,
} from "../../utils/trainSelectionUtils";
import ic_arrow from "../../img/ic_arrow.svg";
import { inputValue } from "../../features/formTicketsSlice";
import { 
  setDataRequest, 
  setParameters 
} from "../../features/catalogTrainsSlice";
import { setReverseData } from "../../features/formTicketsSlice";
import "./MainForm.css"; 

const MainForm = ({ className = "main-form" }) => {
  const { name } = useSelector((state) => state.formTickets);
  const { from, to } = useSelector((state) => state.formTickets.formData);
  const { parameters, trainsParameters } = useSelector(
    (state) => state.catalogTrains.searchData
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { data = [], isError } = useGetCityesNameQuery(name);

  const optionsData = useMemo(() => {
    if (!data.length) return [];
    return data.map((item) => ({
      ...item,
      name: capitalizeFirstLetter(item.name)
    }));
  }, [data]);

  // ✅ Мемоизация данных формы
  const formData = useMemo(() => ({
    from_city_id: from.city._id,
    from_city_name: from.city.name,
    to_city_id: to.city._id,
    to_city_name: to.city.name,
    date_start: from.date,
    date_end: to.date,
  }), [from, to]);

  const filterData = useMemo(() => ({
    sort: parameters.sort.type,
    limit: parameters.limit,
    offset: parameters.offset,
  }), [parameters]);

  // ✅ Оптимизация URL строки
  const urlSearchString = useMemo(() => 
    getUrlSearch(
      { value: name },
      formData,
      filterData,
      trainsParameters
    ), [name, formData, filterData, trainsParameters]
  );

  const clickReverse = () => {
    dispatch(setReverseData());
  };

  const clickHandler = () => {
    dispatch(setDataRequest({ data: { from, to } }));
    dispatch(setParameters({ offset: 0 }));
    
    if (location.pathname !== `/fe-diplom/trains/${urlSearchString}`) {
      navigate({
        pathname: `/fe-diplom/trains/`,
        search: `${urlSearchString}`,
      });
    }
  };

  const onChangeInput = (event) => {
    const value = event.target.value.trim();
    if (value) dispatch(inputValue({ name: value }));
  };

  const onClickInfo = () => {
    document.querySelector(".error_card")?.classList.remove("active");
  };

  const isFormValid = !!(from.city.name && to.city.name && from.date);

  return (
    <div className={className}>
      <div className={`${className}_destination`}>
        <Title
          className={`${className}_departure_title`}
          text="Направление"
        />
        <div className="form-group group-city-name">
          <ControllableStates
            popupIcon={
              <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
            }
            type="startCity"
            value={from.city.name}
            onChangeInput={onChangeInput}
            placeholder="Откуда"
            options={optionsData}
          />
          <button
            type="button"
            className="btn btn-transparent p-0 form_reverse-button"
            onClick={clickReverse}
            aria-label="Поменять местами города"
          >
            <img className="ic_arrow_form" src={ic_arrow} alt="Поменять направление" />
          </button>
          <ControllableStates
            type="finishCity"
            value={to.city.name}
            popupIcon={
              <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
            }
            onChangeInput={onChangeInput}
            placeholder="Куда"
            options={optionsData}
          />
        </div>
      </div>
      
      <div className={`${className}_date-trails`}>
        <Title className={`${className}_departure_title`} text="Дата" />
        <div className="form-group group-date-trails">
          <FormCalendar
            className="main-form_calendar"
            value={from.date ? new Date(from.date) : null}
            type="startDate"
          />
          <FormCalendar
            className="main-form_calendar"
            value={to.date ? new Date(to.date) : null}
            type="finishDate"
          />
        </div>
      </div>
      
      <div className={`${className}_control`}>
        <Button
          text="Найти билеты"
          type="main_form"
          onClick={clickHandler}
          disabled={!isFormValid}
        />
        {isError && location.pathname === "/fe-diplom" && (
          <Info
            type="error"
            text="Что-то пошло не так, обновите страницу..."
            onClick={onClickInfo}
          />
        )}
      </div>
    </div>
  );
};

export default MainForm;