import React from "react";
import GoBackBlock from "../../modules/SelectionWagons/TicketCounter";
import Card from "../../modules/CardsBlock/Card";
import {
  CardBody,
  CardBottom,
  CardTop,
} from "../../modules/CardsBlock/CardComponents";

const TrailDetails = ({ className, data }) => {
  if (!data) {
    return;
  }
  /**инфо о поезде на странице выбора вагона,  "выбрать другой поезд" */

  return (
    <React.Fragment>
      <div className={className + "_details"}>
        <GoBackBlock className={className} type={" come-back"} />
        <Card data={data} className={"trains-block"}>
          <CardTop className={"trains-block_card-top"} data={data} />
          <CardBody className={"trains-block_body"} data={data} />
          <CardBottom className={"trains-block"} data={data.duration} />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default TrailDetails;