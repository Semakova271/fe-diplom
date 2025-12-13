import React from "react";
import { nanoid } from "nanoid";
import Card from "../modules/CardsBlock/Card";
import { CardTop, CardBottom, CardBody } from "../modules/CardsBlock/CardComponents";
import { Button } from "./Button";
import iconInfo from "../../img/ic_info.svg";
import iconError from "../../img/ic_error.svg";

const Info = ({ type, text, onClick }) => {
  const icon = type === "info" ? iconInfo : iconError;

  return (
    <Card id={nanoid()} className={`active ${type}`}>
      <CardTop className={`${type}_card-top`} icon={icon} />
      <CardBody className={`${type}_card-body`}>
        <div className={`${type}_block-text`}>
          <p className={`${type}-text`}>{text}</p>
        </div>
      </CardBody>
      <CardBottom className={`${type}_card`}>
        <Button
          type="modal"
          className="modal_control"
          text="Понятно"
          onClick={onClick}
        />
      </CardBottom>
    </Card>
  );
};

export default Info;