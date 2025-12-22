import React from "react";
import { Link } from "react-router-dom";
import ic_phone from "../../img/ic_phone.svg";
import ic_email from "../../img/ic_email.svg";
import ic_skype from "../../img/ic_skype.svg";
import icon_geo from "../../img/ic_geo.svg";
import icon_in from "../../img/ic_in.svg";
import ic_google from "../../img/ic_google.svg";
import ic_facebook from "../../img/ic_facebook.svg";
import ic_twitter from "../../img/ic_twitter.svg";
import ic_youtube from "../../img/ic_youtobe.svg";
import ic_arrow_footer from "../../img/ic_arrow_footer.svg";
import "./footer.css";

const Footer = () => {
  const socialIcons = [
    { name: 'youtube', icon: ic_youtube, href: '#youtube', label: 'U' },
    { name: 'linkedin', icon: icon_in, href: '#linkedin', label: 'in' },
    { name: 'google', icon: ic_google, href: '#google', label: 'G+' },
    { name: 'facebook', icon: ic_facebook, href: '#facebook', label: 'f' },
    { name: 'twitter', icon: ic_twitter, href: '#twitter', label: '▼' },
  ];

 return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Левая колонка - Контакты */}
          <div className="footer-column footer-contacts">
            <h5 className="footer-title">Свяжитесь с нами</h5>
            <ul className="contacts-list">
              <li className="contact-item">
                <div className="contact-wrapper">
                  <div className="contact-icon">
                    <img src={ic_phone} alt="телефон" />
                  </div>
                  <span className="contact-text">8 (800) 000 00 00</span>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-wrapper">
                  <div className="contact-icon">
                    <img src={ic_email} alt="email" />
                  </div>
                  <span className="contact-text">inbox@mail.ru</span>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-wrapper">
                  <div className="contact-icon">
                    <img src={ic_skype} alt="skype" />
                  </div>
                  <span className="contact-text">tu.train.tickets</span>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-wrapper">
                  <div className="contact-icon">
                    <img src={icon_geo} alt="адрес" />
                  </div>
                  <span className="contact-text">
                    г. Москва<br />
                    ул. Московская 27-35<br />
                    555 555
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Центральная колонка - Подписка */}
          <div className="footer-column footer-subscribe">
            <h5 className="footer-title">Подписка</h5>
            <p className="subscribe-description">Будьте в курсе событий</p>
            <form className="subscribe-form">
              <input
                type="email"
                className="subscribe-input"
                placeholder="email"
              />
              <button type="submit" className="subscribe-button">
                ОТПРАВИТЬ
              </button>
            </form>
            <div className="social-section">
              <h5 className="footer-title">Подписывайтесь на нас</h5>
              <div className="social-icons">
                {socialIcons.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    className="social-icon"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <img src={social.icon} alt={social.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть */}
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="bottom-container">
          <div className="logo-section">
            <Link to="/" className="footer-logo">
              Лого
            </Link>
          </div>
          <div className="center-section">
            <span className="copyright">2018 WEB</span>
          </div>
          <div className="scroll-top-section">
            <a href="#up" className="scroll-top">
              <img src={ic_arrow_footer} alt="наверх" className="scroll-top-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;