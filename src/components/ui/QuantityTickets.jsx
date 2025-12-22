import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { CardTitle } from "./Modules";
import Tooltip from "./Tooltip";
import { templateText } from "../../utils/dataText";
import { 
  setTicketNoSeats 
} from "../../features/passengersSlice"; 
import { nanoid } from "nanoid";

const QuantityTickets = ({ className, data, selected, setSelected }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const tooltipRef = useRef();

  const basedClassesItem = className + "_block-menu-item";
  
  const onMouseOver = (event) => {
    event.preventDefault();
    tooltipRef.current = event.target.dataset.name;

    document
      .querySelector(".tooltip_" + tooltipRef.current)
      .classList.add("visible");
  };
  
  const onMouseOut = (event) => {
    event.preventDefault();

    document
      .querySelector(".tooltip_" + tooltipRef.current)
      .classList.remove("visible");
  };

  const onClickSelected = (type) => {
    setSelected({ type: type });
  };

  const onChangeInput = (event) => {
    document
      .querySelector(".tooltip_" + tooltipRef.current)
      .classList.remove("visible");
    
    if (event.target.value === "") {
      return;
    }
    
    inputRef.current = event.target.parentElement;
    const value = Number(event.target.value);
    
    // Проверка: детские билеты без места не должны превышать взрослые билеты
    const adultCount = data.find(item => item.type === "adult")?.count || 0;
    
    if (value > adultCount) {
      inputRef.current.classList.add("error-quantity");
      inputRef.current.nextElementSibling.style.visibility = "visible";
      return;
    }

    inputRef.current.nextElementSibling.style.visibility = "hidden";
    inputRef.current.classList.remove("error-quantity");
    
    // Обновляем количество детских билетов без места
    dispatch(setTicketNoSeats({ count: value }));
  };

  // Обработчик клика на тип билета (взрослый/детский)
  const handleTicketTypeClick = (item) => {
    if (item.type !== "child-no-seats") {
      onClickSelected(item.type);
    }
  };

  return (
    <React.Fragment>
      <div className={className + "_block"}>
        <CardTitle className={className + "_block"} text="Количество билетов" />

        <div className={className + "_block-menu"}>
          {data.map((item) => {
            return (
              <div
                key={nanoid()}
                id={item.type}
                className={
                  item.type === selected.type
                    ? basedClassesItem + " selected_type-tickets"
                    : basedClassesItem
                }
                onClick={() => handleTicketTypeClick(item)}
              >
                <div
                  className={
                    "input-group-prepend " + className + "_input-group"
                  }
                >
                  <span
                    className={
                      className + " " + item.type + "_input-group-text"
                    }
                  >
                    {item.text + " \u2013"}{" "}
                  </span>
                  
                  {item.type === "child-no-seats" ? (
                    <>
                      <input
                        type="number"
                        data-name={item.type}
                        className={
                          className + " " + item.type + " input form-control"
                        }
                        id="exampleInputTypeTickets"
                        aria-describedby="typeTickets"
                        value={item.count}
                        onChange={onChangeInput}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        min="0"
                        max={data.find(d => d.type === "adult")?.count || 0}
                      />
                      <Tooltip
                        name={item.type}
                        text={
                          item.type === "child-no-seats"
                            ? "Введите количество билетов"
                            : "Кликните на иконку вагона и выберите место из доступных"
                        }
                      />
                    </>
                  ) : (
                    <>
                      <span
                        className={
                          className + " " + item.type + " input-display"
                        }
                        data-name={item.type}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                      >
                        {item.count}
                      </span>
                      <Tooltip
                        name={item.type}
                        text="Кликните на иконку вагона и выберите место из доступных"
                      />
                    </>
                  )}
                </div>
                
                {item.type === "child-no-seats" ? (
                  <Tooltip
                    name="quantity-tickets"
                    text="*Количество билетов без места не должно превышать количество взрослых билетов"
                  />
                ) : (
                  <label
                    htmlFor={"exampleInputTypeTickets"}
                    className={className + " " + item.type + "_input-label"}
                  >
                    {templateText(item)}
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuantityTickets;