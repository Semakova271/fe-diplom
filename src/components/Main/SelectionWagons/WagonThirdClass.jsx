import React from "react";
import { useSelector } from "react-redux";
import {
  getDisabled,
  getSeatsArr,
  getClassName,
} from "../../../utils/WagonSelectionUtils";
import { nanoid } from "nanoid";
const WagonThirdClass = ({ data, selectedTypeTicket, onClick }) => {
  const dataSeats = useSelector((state) => state.passengers.dataSeats);
  const passengers = useSelector((state) => state.passengers.passengers);
  const seatsBtnsArr = getSeatsArr(data.coach.class_type);
console.log(seatsBtnsArr, 'seatsBtnsArr');
console.log(getDisabled(
  6,
  data.seats,
  dataSeats,
  selectedTypeTicket
))
console.log(  data.seats,
 'data.seats');
  console.log( 
    dataSeats,'dataSeats'
    );
    console.log(  
      selectedTypeTicket,' selectedTypeTicket');
  return (
    <React.Fragment>
      <div className="wagon_item wagon-third_class">
        <div className="wagon_template-block">
          <span className="template-text">
            11 человек выбирают места в этом поезде
          </span>
        </div>
        <div className="utils-wagon_wrap wagon-third_class_wrap">
          <div className="utils-wagon-second_class_sector">
            {seatsBtnsArr[0].map((item) => {
              return (
                <div key={nanoid()} className="utils-wagon_buttons-block_box">
                  <button
                    data-price={data.coach.top_price}
                    data-id={item[1]}
                    data-wagon_id={data.coach._id}
                    className={
                      "utils-wagon_button_box" +
                      getClassName(item[1], data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item[1],
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item[1]}
                  </button>
                  <button
                    data-id={item[0]}
                    data-wagon_id={data.coach._id}
                    data-price={data.coach.bottom_price}
                    className={
                      "utils-wagon_button_box" +
                      getClassName(item[0], data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item[0],
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item[0]}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="utils-wagon-second_class_sector side-sector">
            {seatsBtnsArr[1].map((item) => {
              return (
                <div
                  key={nanoid()}
                  className="utils-wagon_buttons-block_side-box"
                >
                  <button
                    data-id={item[0]}
                    data-wagon_id={data.coach._id}
                    data-price={data.coach.bottom_price}
                    className={
                      "utils-wagon_button_box side-button_box" +
                      getClassName(item[0], data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item[0],
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item[0]}
                  </button>
                  <button
                    data-price={data.coach.top_price}
                    data-id={item[1]}
                    data-wagon_id={data.coach._id}
                    className={
                      "utils-wagon_button_box side-button_box" +
                      getClassName(item[1], data, passengers)
                    }
                    onClick={(event) => onClick(event, selectedTypeTicket)}
                    disabled={getDisabled(
                      item[1],
                      data.seats,
                      dataSeats,
                      selectedTypeTicket
                    )}
                  >
                    {item[1]}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WagonThirdClass;