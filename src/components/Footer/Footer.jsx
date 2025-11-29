import React from "react";
import { Link } from "react-router-dom";
import { FormSubscribe } from "../Forms/Forms";
import ic_phone from "../../img/footer/ic_phone.svg";
import ic_email from "../../img/footer/ic_email.svg";
import ic_skype from "../../img/footer/ic_skype.svg";
import icon_geo from "../../img/icon_geo.svg";
import "./footer.css";

// Компонент социальных ссылок
const SocialLinksGroup = () => {
  const socialLinks = [
    { href: "#youtube", icon: "youtube-play", label: "YouTube" },
    { href: "#linkedin", icon: "linkedin", label: "LinkedIn" },
    { href: "#google", icon: "google-plus", label: "Google Plus" },
    { href: "#facebook", icon: "facebook", label: "Facebook" },
    { href: "#twitter", icon: "twitter", label: "Twitter" }
  ];

  return (
    <div className="social text-light">
      <h5 className="footer-social__title text-left">Подписывайтесь на нас</h5>
      <div className="footer-social__icons-group">
        {socialLinks.map(({ href, icon, label }) => (
          <a 
            key={icon} 
            className={`icon_link ${icon === "youtube-play" ? "icon-bottom" : ""}`} 
            href={href}
            aria-label={label}
          >
            <i className={`fa fa-${icon} fa-2x`} aria-hidden="true"></i>
          </a>
        ))}
      </div>
    </div>
  );
};

// Главный компонент футера
const Footer = () => {
  const contacts = [
    { icon: ic_phone, text: "8 (800) 000 00 00", alt: "Телефон" },
    { icon: ic_email, text: "inbox@mail.ru", alt: "Email", className: "height-25" },
    { icon: ic_skype, text: "tu.train.tickets", alt: "Skype" },
    { icon: icon_geo, text: "г.Москва ул.Московская 27-35 555 555", alt: "Адрес", className: "w-21" }
  ];

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="container-fluid footer" id="footer">
      <div className="row height-351">
        <div className="col-6 text-center p-0">
          <section className="footer-contacts text-light">
            <h5 className="footer-contacts__title text-left">Свяжитесь с нами</h5>
            <ul className="footer-contacts__list">
              {contacts.map(({ icon, text, alt, className }) => (
                <li key={text} className="footer-contacts__list-item">
                  <Link to="/" aria-label={alt}>
                    <div className="footer-contacts__wrap">
                      <div className="footer-contacts__icon-wrap">
                        <img src={icon} alt={alt} className={className} />
                      </div>
                      <p className="text-left footer-contacts__paragraph">{text}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <div className="col-6">
          <section className="subscribe text-light">
            <h5 className="footer-subscribe__title text-left">Подписка</h5>
            <p className="text-left footer-subscribe-text">Будьте в курсе событий</p>
            <FormSubscribe />
            <SocialLinksGroup />
          </section>
        </div>
      </div>
      
      <div className="row">
        <div className="col col-lg p-0">
          <div className="footer-border"></div>
          <div className="copyright">
            <Link to="/fe-diplom" className="logo__footer-link" aria-label="Логотип">
              <span>Лого</span>
            </Link>
            <button 
              className="footer-copyright__up-link text-center" 
              onClick={scrollToTop}
              aria-label="Наверх"
            >
              <i className="fa fa-angle-up" aria-hidden="true"></i>
            </button>
            <span className="copyright-text">2023 Web</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;