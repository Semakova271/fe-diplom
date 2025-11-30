import React from "react";
import { Link } from "react-router-dom";
import ic_phone from "../../img/footer/ic_phone.svg";
import ic_email from "../../img/footer/ic_email.svg";
import ic_skype from "../../img/footer/ic_skype.svg";
import icon_geo from "../../img/icon_geo.svg";
import FormSubscribe from "../Forms/FormSubscribe";
import SocialLinksGroup from "./SocialLinksGroup";
import "./footer.css";
import { nanoid } from "nanoid";
const Footer = () => {
  return (
    <React.Fragment>
      <footer className="container-fluid footer" id="footer">
        <div className="row height-351">
          <div className="col-6 text-center p-0">
            <section className="footer-contacts text-light">
              <h5 className="footer-contacts__title text-left">
                Свяжитесь с нами
              </h5>
              <ul className="footer-contacts__list">
                <li className="footer-contacts__list-item">
                  <Link to="/">
                    <div className="footer-contacts__wrap">
                      <div className="footer-contacts__icon-wrap">
                        <img src={ic_phone} alt="icon phone" />
                      </div>
                      <p className="text-left footer-contacts__paragraph">
                        8 (800) 000 00 00
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="footer-contacts__list-item">
                  <Link to="/">
                    {" "}
                    <div className="footer-contacts__wrap">
                      <div className="footer-contacts__icon-wrap ">
                        <img
                          className="height-25"
                          src={ic_email}
                          alt="icon email"
                        />
                      </div>
                      <p className="text-left footer-contacts__paragraph">
                        inbox@mail.ru
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="footer-contacts__list-item">
                  <Link to="/">
                    <div className="footer-contacts__wrap">
                      <div className="footer-contacts__icon-wrap ">
                        <img src={ic_skype} alt="icon skype" />
                      </div>
                      <p className="text-left footer-contacts__paragraph">
                        tu.train.tickets
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="footer-contacts__list-item">
                  <Link to="/">
                    {" "}
                    <div className="footer-contacts__wrap">
                      <div className="footer-contacts__icon-wrap">
                        <img src={icon_geo} alt="icon geo" className="w-21" />
                      </div>
                      <p className="text-left footer-contacts__paragraph">
                        г.Москва ул.Московская 27-35 555 555
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </section>
          </div>
          <div className="col-6">
            <section className="subscribe text-light">
              <h5 className="footer-subscribe__title text-left">Подписка</h5>
              <p className="text-left footer-subscribe-text">
                Будьте в курсе событий
              </p>
              <FormSubscribe key={nanoid()} />
              <SocialLinksGroup key={nanoid()} />
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg p-0">
            <div className="footer-border"></div>
            <div className="copyright">
              <Link
                to="/fe-diplom"
                className="logo__footer-link"
              >
                <span>Лого</span>
              </Link>
              <a
                className=" footer-copyright__up-link text-center"
                href="#startLogo"
              >
                <i className="fa fa-angle-up" aria-hidden="true"></i>
              </a>
              <span className="copyright-text">2023 Web</span>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;