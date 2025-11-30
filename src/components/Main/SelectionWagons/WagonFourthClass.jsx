import React from "react";
import { useSelector } from "react-redux";
import {
  getDisabled,
  getClassName,
  getSeatsArr,
} from "../../../utils/WagonSelectionUtils";
import { nanoid } from "nanoid";
const WagonFourthClass = ({ data, selectedTypeTicket, onClick }) => {
  const dataSeats = useSelector((state) => state.passengers.dataSeats);
  const passengers = useSelector((state) => state.passengers.passengers);
  const seatsBtnsArr = getSeatsArr(data.coach.class_type);
  
  return (
    <React.Fragment>
      <div className="wagon_item wagon-fourth_class">
        <div className="wagon_template-block">
          <span className="template-text">
            11 человек выбирают места в этом поезде
          </span>
        </div>
        <div className="utils-wagon_wrap wagon-fourth_class_wrap">
          <div className="utils-wagon-wagon-fourth_class_sector">
            <div className="utils-wagon-wagon-fourth_class_sector-row">
              {seatsBtnsArr[0].evenArr.map((item) => {
                return (
                  <button
                    key={nanoid()}
                    data-id={item}
                    data-wagon_id={data.coach._id}
                    data-price={data.coach.bottom_price}
                    className={
                      "utils-wagon_button_box wagon-fourth_class_seat-btn" +
                      getClassName(item, data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item,
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="utils-wagon-wagon-fourth_class_sector-row">
              {seatsBtnsArr[0].oddArr.map((item) => {
                return (
                  <button
                    key={nanoid()}
                    data-id={item}
                    data-wagon_id={data.coach._id}
                    data-price={data.coach.bottom_price}
                    className={
                      "utils-wagon_button_box wagon-fourth_class_seat-btn" +
                      getClassName(item, data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item,
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="utils-wagon-wagon-fourth_class_sector">
            <div className="utils-wagon-wagon-fourth_class_sector-row  short-row">
              {seatsBtnsArr[1].evenArr.map((item) => {
                return (
                  <button
                    key={nanoid()}
                    data-id={item}
                    data-wagon_id={data.coach._id}
                    data-price={data.coach.bottom_price}
                    className={
                      "utils-wagon_button_box wagon-fourth_class_seat-btn" +
                      getClassName(item, data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item,
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="utils-wagon-wagon-fourth_class_sector-row">
              {seatsBtnsArr[1].oddArr.map((item) => {
                return (
                  <button
                    key={nanoid()}
                    data-id={item}
                    data-wagon_id={data.coach._id}
                    data-price={data.coach.bottom_price}
                    className={
                      "utils-wagon_button_box wagon-fourth_class_seat-btn" +
                      getClassName(item, data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item,
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WagonFourthClass;