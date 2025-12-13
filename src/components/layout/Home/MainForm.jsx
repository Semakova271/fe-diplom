import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetCityesNameQuery } from "../../../features/myApi";
import { LocationOn } from "@mui/icons-material";
import { Title, Button } from "../../common/Button";
import Info from "../../common/Info";
import FormCalendar from "../../common/Calendar";
import ControllableStates from "../../iu/MUI/ControllableStates";
import {
  capitalizeFirstLetter,
  getUrlSearch,
} from "../../../utils/trainSelectionUtils";
import ic_arrow from "../../../img/ic_arrow.svg";
import { inputValue, setReverseData } from "../../../features/formTicketsSlice";
import { setDataRequest, setParameters } from "../../../features/catalogTrainsSlice";
import "./MainForm.css";

const MainForm = ({ className }) => {
  const { name } = useSelector((state) => state.formTickets);
  const { from, to } = useSelector((state) => state.formTickets.formData);
  const { parameters, trainsParameters } = useSelector(
    (state) => state.catalogTrains.searchData
  );
  const dispatch = useDispatch();
  const reverseRef = useRef();
  const formRef = useRef();
  const { data = [], isError } = useGetCityesNameQuery(name);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyFields, setShowEmptyFields] = useState(false);

  if (isError) console.log(isError, "error!!!");

  let optionsData = [];
  if (data.length > 0) {
    optionsData = data.map((item) => {
      return { ...item, name: capitalizeFirstLetter(item.name) };
    });
  }

  const clickReverse = () => {
    dispatch(setReverseData());
  };

  const clickHandler = () => {
    // Сбрасываем предыдущую ошибку
    setErrorMessage("");
    setShowEmptyFields(false);
    
    // Проверяем каждое поле отдельно
    const emptyFields = [];
    
    if (!from.city.name || from.city.name.trim() === "") {
      emptyFields.push("город отправления");
    }
    
    if (!to.city.name || to.city.name.trim() === "") {
      emptyFields.push("город прибытия");
    }
    
    if (!from.date) {
      emptyFields.push("дату отправления");
    }
    
    // Если есть незаполненные поля
    if (emptyFields.length > 0) {
      setShowEmptyFields(true);
      
      // Формируем сообщение об ошибке
      let message = "";
      if (emptyFields.length === 1) {
        message = `Заполните ${emptyFields[0]}`;
      } else if (emptyFields.length === 2) {
        message = `Заполните ${emptyFields[0]} и ${emptyFields[1]}`;
      } else {
        message = `Заполните ${emptyFields[0]}, ${emptyFields[1]} и ${emptyFields[2]}`;
      }
      
      setErrorMessage(message);
      console.log("Ошибка заполнения:", emptyFields);
      return;
    }
    
    // Все поля заполнены - выполняем поиск
    console.log('Поиск билетов:', {
      from: from.city,
      to: to.city,
      date: from.date
    });
    
    // Обновляем данные в Redux
    dispatch(setDataRequest({ 
      data: { 
        from: { 
          city: { 
            _id: from.city._id, 
            name: from.city.name 
          }, 
          date: from.date 
        }, 
        to: { 
          city: { 
            _id: to.city._id, 
            name: to.city.name 
          }, 
          date: to.date 
        } 
      } 
    }));
    
    dispatch(setParameters({ offset: 0 }));
    
    // Формируем параметры для URL
    const formData = {
      from_city_id: from.city._id || "",
      from_city_name: from.city.name || "",
      to_city_id: to.city._id || "",
      to_city_name: to.city.name || "",
      date_start: from.date || "",
      date_end: to.date || "",
    };
    
    const searchOptions = { value: name };
    const filterData = {
      sort: parameters.sort.type,
      limit: parameters.limit,
      offset: 0,
    };
    
    // Генерируем строку поиска для URL
    const urlSearchString = getUrlSearch(
      searchOptions,
      formData,
      filterData,
      trainsParameters
    );
    
    console.log('Навигация на:', {
      pathname: `/fe-diplom/trains`,
      search: urlSearchString
    });
    
    // Переходим на страницу поиска
    navigate({
      pathname: `/fe-diplom/trains`,
      search: urlSearchString ? `?${urlSearchString}` : "",
    });
  };

  const onChangeInput = (event) => {
    const value = event.target.value;
    // Сбрасываем ошибку при вводе
    if (errorMessage) {
      setErrorMessage("");
      setShowEmptyFields(false);
    }
    
    if (value.trim() !== "") {
      dispatch(inputValue({ name: value }));
    }
  };

  const onClickInfo = () => {
    const errorCard = document.querySelector(".error_card");
    if (errorCard) {
      errorCard.classList.remove("active");
    }
  };

  // Детальная отладка
  console.log('=== MainForm состояние ===', { 
    fromCity: from.city,
    toCity: to.city,
    date: from.date,
    locationPath: location.pathname
  });

  return (
    <div className={`mainForm ${className}`}>
      {/* Направление */}
      <div className="destination">
        <Title
          className="departureTitle"
          text="Направление"
        />
        <div ref={reverseRef} className="groupCityName">
          <ControllableStates
            popupIcon={
              <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
            }
            type="startCity"
            value={from.city.name || ""}
            onChangeInput={onChangeInput}
            placeholder="Откуда"
            options={optionsData}
          />
          <button
            type="button"
            className="reverseButton"
            onClick={clickReverse}
            aria-label="Поменять направления местами"
          >
            <img className="arrowIcon" src={ic_arrow} alt="Поменять местами" />
          </button>
          <ControllableStates
            type="finishCity"
            value={to.city.name || ""}
            popupIcon={
              <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
            }
            onChangeInput={onChangeInput}
            placeholder="Куда"
            options={optionsData}
          />
        </div>
        
        {/* Подсветка незаполненных полей городов */}
        {showEmptyFields && (
          <>
            {(!from.city.name || from.city.name.trim() === "") && (
              <div style={{
                color: '#FF4D4F',
                fontSize: '12px',
                marginTop: '5px',
                marginLeft: '10px'
              }}>
                ⚠️ Укажите город отправления
              </div>
            )}
            {(!to.city.name || to.city.name.trim() === "") && (
              <div style={{
                color: '#FF4D4F',
                fontSize: '12px',
                marginTop: '5px',
                marginLeft: '10px'
              }}>
                ⚠️ Укажите город прибытия
              </div>
            )}
          </>
        )}
      </div>

      {/* Дата */}
      <div className="dateTrails">
        <Title className="departureTitle" text="Дата" />
        <div className="groupDateTrails">
          <FormCalendar
            value={from.date ? new Date(from.date) : null}
            type="startDate"
            className="calendar"
          />
          <FormCalendar
            value={to.date ? new Date(to.date) : null}
            type="finishDate"
            className="calendar"
          />
        </div>
        
        {/* Подсветка незаполненной даты */}
        {showEmptyFields && !from.date && (
          <div style={{
            color: '#FF4D4F',
            fontSize: '12px',
            marginTop: '5px',
            marginLeft: '10px'
          }}>
            ⚠️ Выберите дату отправления
          </div>
        )}
      </div>

      {/* Кнопка и сообщения */}
      <div className="control">
        <Button
          text="НАЙТИ БИЛЕТЫ"
          type="main_form"
          onClick={clickHandler}
          disabled={false} // Кнопка всегда активна
        />
        
        {/* Отладочная информация */}
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginTop: '5px',
          backgroundColor: '#f5f5f5',
          padding: '5px',
          borderRadius: '3px'
        }}>
          <strong>Отладка формы:</strong><br/>
          Откуда: <strong style={{color: from.city.name ? 'green' : 'red'}}>
            {from.city.name ? `"${from.city.name}"` : 'не заполнено'}
          </strong><br/>
          Куда: <strong style={{color: to.city.name ? 'green' : 'red'}}>
            {to.city.name ? `"${to.city.name}"` : 'не заполнено'}
          </strong><br/>
          Дата: <strong style={{color: from.date ? 'green' : 'red'}}>
            {from.date || 'не выбрана'}
          </strong>
        </div>
        
        {/* Основное сообщение об ошибке */}
        {errorMessage && (
          <div className="error-message" style={{
            marginTop: '15px',
            padding: '15px',
            backgroundColor: '#FFF2F0',
            color: '#FF4D4F',
            borderRadius: '6px',
            border: '1px solid #FFCCC7',
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            lineHeight: '1.5'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <span><strong>Заполните все обязательные поля:</strong> {errorMessage}</span>
            </div>
          </div>
        )}
        
        {/* Сообщение о некорректном городе */}
        {isError && location.pathname === "/fe-diplom" && (
          <Info
            type="error"
            text="Введен некорректный город, попробуйте другой..."
            onClick={onClickInfo}
          />
        )}
      </div>
    </div>
  );
};

export default MainForm;