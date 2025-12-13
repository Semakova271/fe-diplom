import React from "react";
import { nanoid } from "nanoid";
import Card from "../modules/CardsBlock/Card";
import { CardTop, CardBottom, CardBody } from "../modules/CardsBlock/CardComponents";
import { Button } from "./Button";
import iconInfo from "../../img/ic_info.svg";

const Modal = ({ onClick }) => (
  <div className="modal-wrapper">
    <div className="modal">
      <Card id={nanoid()} className="modal">
        <CardTop className="modal_card-top" icon={iconInfo} />
        <CardBody className="modal_card-body">
          <div className="modal_block-text">
            
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

export default Modal;