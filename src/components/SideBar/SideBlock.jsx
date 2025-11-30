import React, { useState, useEffect } from "react";
import { CardTitle, MySvgIcon, Button } from "../Atoms/Atoms";
import Timing from "./Timing";
import TripDetails from "./TripDetails";
import Tooltip from "../Molecules/Tooltip";
import icon_arrow from "../../img/sidebar/icon_arrow.svg";
const SideBlock = ({ type, data, date, side, children, parent, onChange }) => {
  const [showTiming, setShowTiming] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const basedClasses =
    type === "departure" ? "sidebar-block-departure" : "sidebar-block-arrival";

  useEffect(() => {
    if (date) setShowTooltip(false);
  }, [date]);
  const clickHandler = (type) => {
    date ? setShowTiming(!showTiming) : setShowTooltip(!showTooltip);
  };

  return (
    <React.Fragment>
      <div className={"sidebar-side-block " + basedClasses}>
        <div className="sidebar-side-block_header">
          {showTooltip ? (
            <Tooltip
              name={"side_block_" + type}
              text={
                "Выберите дату " +
                (side === "start" ? "отправления" : "возвращения")
              }
            />
          ) : null}
          <MySvgIcon
            type="sidebar-side-block"
            icon={icon_arrow}
            className={basedClasses + "_arrow"}
          />
          <CardTitle
            text={type === "departure" ? "Туда" : "Обратно"}
            className="sidebar-side-block"
          />
          {data && data.departure.from.date ? (
            <span className="sidebar-side-block_date">
              {data.departure.from.date}
            </span>
          ) : null}
          <Button type="sidebar-side-block" onClick={() => clickHandler(type)}>
            {showTiming ? (
              <i className="fa fa-minus" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-plus" aria-hidden="true"></i>
            )}
          </Button>
        </div>
        {showTiming && !data && !parent ? (
          <Timing type={type} onChangeHandler={onChange} />
        ) : null}
        {showTiming && parent && <TripDetails />}
        {children ? children : null}
      </div>
    </React.Fragment>
  );
};

export default SideBlock;
