import React from "react";
import { Link } from 'react-router-dom';
import ic_subtract from "../../../img/ic_subtract.svg";
import ic_house from "../../../img/ic_house.svg";
import ic_globe from "../../../img/ic_globe.svg";
import './HowItWorks.css';

const HowItWorks = () => {
  const items = [
    { alt: 'Удобно', src: ic_subtract, text: 'Удобный заказ на сайте' },
    { alt: 'Удаленно', src: ic_house, text: 'Нет необходимости ехать в офис' },
    { alt: 'Выбор', src: ic_globe, text: 'Огромный выбор направлений' },
  ];

  return (
    <section id="description" className="description">
      <header className="description__header">
        <h2 className="description__title">Как это работает</h2>
        <Link to="#footer" className="desription__link">
          Узнать больше
        </Link>
      </header>

      <ul className="description__list">
        {items.map((item, idx) => (
          <li className="description__item" key={idx}>
            <img src={item.src} alt={item.alt} className="description__img" />
            <p className="description__text">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HowItWorks;