import React, { useState } from "react";
import ContentBlock from "./ContentBlock";
import { formattedPrice } from "../../utils/trainSelectionUtils";
import "./AvailableVagons.css";

export default function AvailableVagons({ amount, type, className, min_price, item }) {
  let currentPrice = item.min_price;
  let showSeatTypes = false;
  let template = null;

  // Определяем, какие типы мест показывать для каждого класса
  if (item.name === "fourth" || item.name === "first") {
    // Для сидячих и люкса показываем только одно значение
    template = {
      amount: item.amount,
      seats: [{ name: "", price: item.min_price }],
    };
    currentPrice = item.min_price;
    showSeatTypes = false;
  } else if (item.name === "third") {
    // Плацкарт: верхние, нижние и боковые
    template = {
      amount: Math.floor(item.amount / 3),
      seats: [
        { name: "верхние", price: item.top_price },
        { name: "нижние", price: item.bottom_price },
        { name: "боковые", price: item.side_price },
      ],
    };
    currentPrice = item.side_price || item.top_price;
    showSeatTypes = true;
  } else if (item.name === "second") {
    // Купе: верхние и нижние
    template = {
      amount: Math.floor(item.amount / 2),
      seats: [
        { name: "верхние", price: item.top_price },
        { name: "нижние", price: item.bottom_price },
      ],
    };
    currentPrice = item.top_price;
    showSeatTypes = true;
  }

  const [showSeatsPopup, setShowSeatsPopup] = useState(false);

  const handleTypeHover = () => {
    if (showSeatTypes) {
      setShowSeatsPopup(true);
    }
  };

  const handleTypeLeave = () => {
    setTimeout(() => {
      setShowSeatsPopup(false);
    }, 300);
  };

  const handlePopupMouseEnter = () => {
    setShowSeatsPopup(true);
  };

  const handlePopupMouseLeave = () => {
    setShowSeatsPopup(false);
  };

  return (
    <div className={`available-wagons_block-item wagons-${item.name}-class`}>
      <div className="available-seats_group-text">
        <span 
          className="wagons_type"
          onMouseEnter={handleTypeHover}
          onMouseLeave={handleTypeLeave}
        >
          {type}
        </span>
        <div className={`wagons_${className}-class amount-seats`}>
          {amount}
        </div>
      </div>
      
      <div className="wagons-type_price">
        <span className="text-min-price">от</span>
        <span className="wagons-type_min-price">
          {formattedPrice(currentPrice)}
          <i className="fa fa-rub currency-icon" aria-hidden="true"></i>
        </span>
      </div>

      {/* Убрали кнопку "Выбрать места" здесь */}

      {showSeatsPopup && showSeatTypes && template && (
        <div 
          className="available-seats_block"
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <div className="available-seats-header">
            <h4>Доступные места в {type.toLowerCase()}</h4>
          </div>
          {template.seats.map((seat, index) => (
            <div key={index} className="available-seats-item">
              <div className="available-seats-info">
                <span className="available-seats_name">{seat.name}</span>
                <span className="available-seats_amount">{template.amount}</span>
              </div>
              <div className="available-seats-price">
                <span className="available-seats_min-price">
                  {formattedPrice(seat.price)}
                  <i className="fa fa-rub currency-icon" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}