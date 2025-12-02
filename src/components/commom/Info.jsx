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
import icon_error from "../../img/icon_error.svg";

const Info = ({ type, text, onClick }) => {
  return (
    <Card id={nanoid()} className={"active " + type}>
      <CardTop
        className={type + "_card-top"}
        icon={type === "info" ? icon_info : icon_error}
      />
      <CardBody className={type + "_card-body"}>
        <div className={type + "_block-text"}>
          <p className={type + "-text"}>{text}</p>
        </div>
      </CardBody>
      <CardBottom className={type + "_card"}>
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