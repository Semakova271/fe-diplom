import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHomePage = location.pathname === "/fe-diplom" || 
                     location.pathname === "/fe-diplom/" || 
                     location.pathname === "/";

  // Функция для обработки навигации
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    
    if (isHomePage) {
      // Мы на домашней странице - плавная прокрутка
      scrollToSection(sectionId);
    } else {
      // Мы НЕ на домашней странице - переходим на главную с хэшем
      navigate(`/fe-diplom${sectionId}`);
    }
  };

  // Упрощенная функция плавной прокрутки
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (!element) return;
    
    // Используем нативную прокрутку браузера
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Обновляем URL
    window.history.pushState(null, "", `${window.location.pathname}${sectionId}`);
  };

  // Обработчик клика по логотипу
  const handleLogoClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, "", "/fe-diplom");
    }
  };

  // Обработчик хэшей при загрузке/изменении
  useEffect(() => {
    if (isHomePage && location.hash) {
      // Небольшая задержка для гарантии полной загрузки DOM
      const timer = setTimeout(() => {
        scrollToSection(location.hash);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.hash, isHomePage]);

  return (
    <header className="header">
      {/* Первая строка: Лого */}
      <div className="logo-row">
        <Link 
          to="/fe-diplom" 
          className="main-logo"
          onClick={handleLogoClick}
        >
          Лого
        </Link>
      </div>

      {/* Вторая строка: Навигация в черной полосе */}
      <div className="nav-row">
        <div className="nav-container">
          <a 
            href="#about"
            className="nav-item"
            onClick={(e) => handleNavClick("#about", e)}
          >
            О нас
          </a>
          <a 
            href="#howItWorks"
            className="nav-item"
            onClick={(e) => handleNavClick("#howItWorks", e)}
          >
            Как это работает
          </a>
          <a 
            href="#feedback"
            className="nav-item"
            onClick={(e) => handleNavClick("#feedback", e)}
          >
            Отзывы
          </a>
          <a 
            href="#footer"
            className="nav-item"
            onClick={(e) => handleNavClick("#footer", e)}
          >
            Контакты
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;