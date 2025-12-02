import React from "react";
import { nanoid } from "nanoid";
import Card from "../modules/CardsBlock/Card";
import {
  CardTop,
  CardBottom,
  CardBody,
} from "../modules/CardsBlock/CardComponents";
import { Button } from "../commom/Button";
import icon_info from "../../img/icon_info.svg";

const Modal = ({ type, onClick }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <Card id={nanoid()} className="modal">
          <CardTop className="modal_card-top" icon={icon_info} />
          <CardBody className="modal_card-body">
            <div className="modal_block-text">
              <p className="info-text">
                Таким образом, консультация с широким активом в значительной
                степени обуславливает создание модели развития
              </p>
              <p className="info-text">
                повседневная практика показывает, что сложившаяся структура
                организации играет важную роль в формировании существенных
                финансовых и административных ...расходов
              </p>
            </div>
          </CardBody>
          <CardBottom className="modal_card">
            <Button
              type="modal"
              className="modal_control"
              text="Понятно"
              onClick={onClick}
            />
          </CardBottom>
        </Card>
      </div>
    </div>
  );
};

export default Modal;