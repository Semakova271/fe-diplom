import React from "react";
import {MySvgIcon } from "../../Atoms/Atoms";
import Card from "../CardsBlock/Card";
import { CardTop, CardBody } from "../CardsBlock/CardsMolecules";
import icon_comp from "../../../img/orderResult/icon_comp.svg";
import icon_tickets from "../../../img/orderResult/icon_tickets.svg";
import icon_driver from "../../../img/orderResult/icon_driver.svg";

const Puncts = () => {
    return (
      <section className="order-result_puncts section">
        <div className="order-result_cards card-desk">
          <Card className="order-result_block-item">
            <CardTop className="order-result_cards-item card">
              <MySvgIcon
                type="order-result_card-top"
                className="order-result"
                icon={icon_comp}
              />
              <CardBody className="order-result cards-item">
                <span>
                  Билеты будут отправлены на Ваш
                  <strong className="strong-text">{" e-mail"}</strong>
                </span>
              </CardBody>
            </CardTop>
          </Card>
          <Card className="order-result_block-item">
            <CardTop className="order-result_cards-item card">
              <MySvgIcon
                type="order-result_card-top"
                className="order-result"
                icon={icon_tickets}
              />
            </CardTop>
            <CardBody className="order-result cards-item">
              <span>
                <strong className="strong-text">{"распечатайте "}</strong>и
                сохраняйте билеты до даты поездки
              </span>
            </CardBody>
          </Card>
          <Card className="order-result_block-item">
            <CardTop className="order-result_cards-item card">
              <MySvgIcon
                type="order-result_card-top"
                className="order-result"
                icon={icon_driver}
              />
            </CardTop>
            <CardBody className="order-result cards-item">
              <span>
                <strong className="strong-text">{"предъявите "}</strong>
                распечатанные билеты при посадке
              </span>
            </CardBody>
          </Card>
        </div>
      </section>
    );
  };
  
  export default Puncts;