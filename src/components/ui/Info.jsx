import React from "react";
import Card from "./Card";
import {
  CardTop,
  CardBottom,
  CardBody,
} from "./CardsModules";
import { Button } from "./Modules";
import icon_info from "../../img/ic_info.svg";
import icon_error from "../../img/ic_error.svg";
import { nanoid } from "nanoid";
import "./Info.css";

const Info = ({ type = "info", text, title, onConfirm, showButton = true, buttonText = "Понятно" }) => {
  return (
    <React.Fragment>
      <Card id={nanoid()} className={`info-modal active ${type}`}>
        <CardTop
          className={`${type}_card-top`}
          icon={type === "info" ? icon_info : icon_error}
        >
          {title && (
            <div className="info-title">
              <h3>{title}</h3>
            </div>
          )}
        </CardTop>
        <CardBody className={`${type}_card-body`}>
          <div className="info-content">
            {text && (
              <div className="info-text-block">
                <p className="info-text">{text}</p>
              </div>
            )}
            
            {/* Дополнительный контент из описания */}
            <div className="additional-content">
              <p className="info-paragraph">
                Таким образом консультация с широким активом в значительной степени обуславливает создание модели развития.
              </p>
              <p className="info-paragraph">
                Повседневная практика показывает, что сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий.
              </p>
              <p className="info-paragraph">
                Понятно
              </p>
            </div>
          </div>
        </CardBody>
        <CardBottom className={`${type}_card`}>
          {showButton && (
            <Button
              type="modal"
              className="modal_control confirm-button"
              text={buttonText}
              onClick={onConfirm}
            />
          )}
        </CardBottom>
      </Card>
    </React.Fragment>
  );
};

export default Info;