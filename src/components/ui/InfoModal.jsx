import React from "react";
import Card from "./Card";
import {
  CardTop,
  CardBottom,
  CardBody,
} from "./CardsModules";
import icon_info from "../../img/ic_info.svg";
import { nanoid } from "nanoid";
import { Button } from "./Modules";
import "./InfoModal.css";

const InfoModal = ({ type, onClick, isOpen }) => {
  return (
    <React.Fragment>
      <div className={`info-modal-wrapper ${isOpen ? "info-modal-active" : ""}`}>
        <div className="info-modal">
          <Card id={nanoid()} className="info-modal-card">
            <CardTop className="info-modal__card-top" icon={icon_info} />
            <CardBody className="info-modal__card-body">
              <div className="info-modal__block-text">
                <p className="info-text" style={{ fontWeight: '500', fontSize: '20px', marginBottom: '15px' }}>
                  Подробная информация о работе сервиса
                </p>
                <p className="info-text">
                  Таким образом консультация с широким активом в значительной степени обуславливает создание модели развития.
                </p>
                <p className="info-text">
                  Повседневная практика показывает, что сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий.
                </p>
                {/* Убрали дублирующее "Понятно" из текста */}
              </div>
            </CardBody>
            <CardBottom className="info-modal__card-bottom">
              <Button
                type="info-modal"
                className="info-modal__control"
                text="Понятно"
                onClick={onClick}
              />
            </CardBottom>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InfoModal;