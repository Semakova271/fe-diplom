import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./Modules";

const GoBackBlock = ({ className, type }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = () => {
    navigate({ pathname: "/fe-diplom/trains", search: location.search });
  };
  return (
    <React.Fragment>
      <div className={className + "_buttons-group"}>
        <Button type={className + type}>
          <i
            className="fa fa-2x fa-long-arrow-right"
            style={{ color: "#fff" }}
            aria-hidden="true"
          ></i>
        </Button>
        <Button type={type + "-text"} onClick={clickHandler}>
          Выбрать другой поезд
        </Button>
      </div>
    </React.Fragment>
  );
};

export default GoBackBlock;