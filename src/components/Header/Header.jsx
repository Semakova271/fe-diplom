import React from "react";
import { Link, HashLink } from "react-router-hash-link";
import "./header.css";

// Компонент логотипа
const Logo = () => {
  return (
    <Link to="/fe-diplom" className="logo-container" id="startLogo">
      Лого
    </Link>
  );
};

// Компонент навигации
const NavBar = () => {
  const navItems = [
    { to: "/fe-diplom#about", label: "О нас" },
    { to: "/fe-diplom#howItWorks", label: "Как это работает" },
    { to: "/fe-diplom#feedback", label: "Отзывы" },
    { to: "#footer", label: "Контакты" }
  ];

  return (
    <nav className="navbar navbar-expand-sm pl-0 navbar-dark bg-dark" id="navBar">
      <div className="collapse navbar-collapse" id="navbarMain">
        <ul className="navbar-nav mr-auto nav-list">
          {navItems.map((item, index) => (
            <li key={item.to} className={`nav-item ${index === 0 ? 'active' : ''}`}>
              <HashLink className="nav-link" to={item.to}>
                {item.label}
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Главный компонент хедера
const Header = () => {
  return (
    <header className="container-fluid header">
      <div className="row">
        <div className="col col-md">
          <div className="header-top">
            <Logo />
          </div>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;