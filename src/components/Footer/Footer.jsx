import React from "react";
import { Link } from "react-router-dom";
import ic_phone from "../../img/footer/ic_phone.svg";
import ic_email from "../../img/footer/ic_email.svg";
import ic_skype from "../../img/footer/ic_skype.svg";
import icon_geo from "../../img/icon_geo.svg";
import FormSubscribe from "../Forms/FormSubscribe";
import SocialLinksGroup from "./SocialLinksGroup";
import "./footer.css";

const contacts = [
  { 
    icon: ic_phone, 
    text: "8 (800) 000 00 00", 
    alt: "icon phone" 
  },
  { 
    icon: ic_email, 
    text: "inbox@mail.ru", 
    alt: "icon email",
    className: "height-25" 
  },
  { 
    icon: ic_skype, 
    text: "tu.train.tickets", 
    alt: "icon skype" 
  },
  { 
    icon: icon_geo, 
    text: "г.Москва ул.Московская 27-35 555 555", 
    alt: "icon geo",
    className: "w-21" 
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__main">
        <section className="footer-contacts text-light">
          <h5 className="footer-contacts__title">Свяжитесь с нами</h5>
          <ul className="footer-contacts__list">
            {contacts.map((contact, index) => (
              <li key={index} className="footer-contacts__list-item">
                <Link to="/">
                  <div className="footer-contacts__wrap">
                    <div className="footer-contacts__icon-wrap">
                      <img 
                        src={contact.icon} 
                        alt={contact.alt}
                        className={contact.className || ''}
                      />
                    </div>
                    <p className="footer-contacts__paragraph">
                      {contact.text}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="subscribe text-light">
          <h5 className="footer-subscribe__title">Подписка</h5>
          <p className="footer-subscribe-text">
            Будьте в курсе событий
          </p>
          <FormSubscribe />
          <SocialLinksGroup />
        </section>
      </div>

      <div className="footer__bottom">
        <div className="footer-border"></div>
        <div className="copyright">
          <Link to="/fe-diplom" className="logo__footer-link">
            <span>Лого</span>
          </Link>
          <button 
            className="footer-copyright__up-link"
            onClick={scrollToTop}
            aria-label="Наверх"
          >
            <i className="fa fa-angle-up" aria-hidden="true"></i>
          </button>
          <span className="copyright-text">2023 Web</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;