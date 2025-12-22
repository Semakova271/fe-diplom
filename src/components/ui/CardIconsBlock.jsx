import React from "react";
import "./CardIconsBlock.css";

const CardIconsBlock = ({ wifi, express, className }) => {
  return (
    <div className={className ? className : "trains-menu_icons-block"}>
      <div className={`icon_wifi ${wifi ? 'active' : ''}`} title="Wi-Fi"></div>
      <div className={`icon_rocket ${express ? 'active' : ''}`} title="Экспресс"></div>
      <div className="icon_coffee active" title="Кафе"></div>
    </div>
  );
};

export default CardIconsBlock;