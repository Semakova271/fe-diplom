import React, { useState, useEffect } from "react";
import CardIconsBlock from "./CardIconsBlock";
import { nanoid } from "nanoid";
import { CardTitle } from "./Modules";
import { capitalizeFirstLetter, formattedPrice } from "../../utils/trainSelectionUtils";
import "./LastTickets.css";

const LastTickets = () => {
  const [lastTickets, setLastTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLastTickets();
  }, []);

  const fetchLastTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://students.netoservices.ru/fe-diplom/routes/last');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Получены последние билеты:', data); // Для отладки
      setLastTickets(data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке последних билетов:', err);
      setError('Не удалось загрузить последние билеты');
      
      // Fallback данные для демонстрации
      setLastTickets([
        {
          departure: {
            from: {
              city: { name: "санкт-петербург" },
              railway_station_name: "Ладожский"
            },
            to: {
              city: { name: "архангельск" },
              railway_station_name: "Архангельск"
            },
            have_wifi: true,
            is_express: false,
            min_price: 685
          }
        },
        {
          departure: {
            from: {
              city: { name: "санкт-петербург" },
              railway_station_name: "Московский"
            },
            to: {
              city: { name: "агрыз" },
              railway_station_name: "Агрыз"
            },
            have_wifi: true,
            is_express: true,
            min_price: 3525
          }
        },
        {
          departure: {
            from: {
              city: { name: "адлер" },
              railway_station_name: "Адлер"
            },
            to: {
              city: { name: "аткарск" },
              railway_station_name: "Аткарск"
            },
            have_wifi: false,
            is_express: true,
            min_price: 2568
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="last-tickets-block">
        <CardTitle text="ПОСЛЕДНИЕ БИЛЕТЫ" className={"last-tickets"} />
        <div className="loading-state">
          <p>Загрузка последних билетов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="last-tickets-block">
        <CardTitle text="ПОСЛЕДНИЕ БИЛЕТЫ" className={"last-tickets"} />
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchLastTickets} className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!lastTickets || lastTickets.length === 0) {
    return (
      <div className="last-tickets-block">
        <CardTitle text="ПОСЛЕДНИЕ БИЛЕТЫ" className={"last-tickets"} />
        <div className="no-tickets">
          <p>Нет доступных билетов</p>
        </div>
      </div>
    );
  }

  return (
    <div className="last-tickets-block">
      <CardTitle text="ПОСЛЕДНИЕ БИЛЕТЫ" className={"last-tickets"} />
      <div className="card-deck last-tickets-menu-group no-gutters">
        {lastTickets.map((item) => (
          <Card key={nanoid()} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LastTickets;

const Card = (item) => {
  // Обрабатываем данные, которые приходят с сервера
  const { departure = {} } = item;
  const { from = {}, to = {}, have_wifi, is_express, min_price } = departure;
  
  // Проверяем и обрабатываем данные городов и вокзалов
  const fromCityName = from?.city?.name || from?.name || "Город отправления";
  const toCityName = to?.city?.name || to?.name || "Город назначения";
  const fromStation = from?.railway_station_name || "вокзал";
  const toStation = to?.railway_station_name || "вокзал";
  const price = min_price || item.min_price || 0;

  return (
    <div className="card last-tickets-menu-item">
      <div className="card-body p-0 last-tickets__card">
        {/* Город отправления */}
        <div className="last-tickets_train-departure-from d-flex flex-column">
          <span className="last-tickets_train-departure data-trains-city-name">
            {capitalizeFirstLetter(fromCityName)}
          </span>
          <span className="last-tickets_train-departure data-trains-railway_station_name">
            {fromStation.endsWith(" вокзал") ? fromStation : `${fromStation} вокзал`}
          </span>
        </div>
        
        {/* Город назначения */}
        <div className="last-tickets_train-departure-from d-flex flex-column align-items-end">
          <span className="last-tickets_train-departure-to data-trains-city-name">
            {capitalizeFirstLetter(toCityName)}
          </span>
          <span className="last-tickets_train-departure-to data-trains-railway_station_name">
            {toStation.endsWith(" вокзал") ? toStation : `${toStation} вокзал`}
          </span>
        </div>
      </div>
      
      {/* Нижняя часть карточки с иконками и ценой */}
      <div className="card-bottom last-tickets__card">
        <CardIconsBlock
          wifi={have_wifi}
          express={is_express}
          className={"trains-menu_icons-block"}
        />
        <div className="last-tickets__card-price">
          <span className="text-min-price">от</span>
          <span className="last-tickets__card_min-price">
            {formattedPrice(price)}
          </span>
          <i
            className="fa fa-rub last-tickets__card_bottom-icon currency-icon"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
};