import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/fe-diplom" || 
                     location.pathname === "/fe-diplom/" || 
                     location.pathname === "/";

  // Функция для плавной прокрутки
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100; // Отступ для хедера
    window.scrollTo({ 
      top: yCoordinate + yOffset, 
      behavior: 'smooth' 
    });
  };

  return (
    <header className="header">
      {/* Первая строка: Лого */}
      <div className="logo-row">
        <Link to="/fe-diplom" className="main-logo">
          Лого
        </Link>
      </div>

      {/* Вторая строка: Навигация в черной полосе */}
      <div className="nav-row">
        <div className="nav-container">
          <HashLink 
            to={isHomePage ? "#about" : "/fe-diplom#about"}
            className="nav-item"
            scroll={scrollWithOffset}
          >
            О нас
          </HashLink>
          <HashLink 
            to={isHomePage ? "#howItWorks" : "/fe-diplom#howItWorks"}
            className="nav-item"
            scroll={scrollWithOffset}
          >
            Как это работает
          </HashLink>
          <HashLink 
            to={isHomePage ? "#feedback" : "/fe-diplom#feedback"}
            className="nav-item"
            scroll={scrollWithOffset}
          >
            Отзывы
          </HashLink>
          <HashLink 
            to="#footer"
            className="nav-item"
            scroll={scrollWithOffset}
          >
            Контакты
          </HashLink>
        </div>
      </div>
    </header>
  );
};

export default Header;