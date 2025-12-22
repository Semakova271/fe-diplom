import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ProgressBar.css"; 

const ProgressBar = () => {
  const location = useLocation();
  const params = useParams();
 
  if (
    location.pathname === "/fe-diplom" ||
    location.pathname === "/fe-diplom/order-result"
  ) {
    return;
  }

  let step = 1;

  if (location.pathname === `/fe-diplom/screening/${params.id}`) {
    step = 4;
  } else if (
    location.pathname === `/fe-diplom/personal_information/${params.id}`
  ) {
    step = 3;
  } else if (
    location.pathname === `/fe-diplom/passengers/${params.id}`
  ) {
    step = 2;
  }

  return (
    <React.Fragment>
      <div className="progress">
        <div className="progress-bar-container">
          <div className="progress-bar step-tickets p-0 step_active">
            <div className="progress-bar-content">
              <span className="numbering">1</span>
              <span className="progress-bar-name">Билеты</span>
            </div>
          </div>
          <div
            className={
              step < 2
                ? "progress-bar step-passenger p-0"
                : "progress-bar step-passenger p-0 step_active"
            }
          >
            <div className="progress-bar-content">
              <span className="numbering">2</span>
              <span className="progress-bar-name">Пассажиры</span>
            </div>
          </div>
          <div
            className={
              step < 3
                ? "progress-bar step-pay p-0"
                : "progress-bar step-pay p-0 step_active"
            }
          >
            <div className="progress-bar-content">
              <span className="numbering">3</span>
              <span className="progress-bar-name">Оплата</span>
            </div>
          </div>
          <div
            className={
              step < 4
                ? "progress-bar step-validate p-0"
                : "progress-bar step-validate p-0 step_active"
            }
          >
            <div className="progress-bar-content">
              <span className="numbering">4</span>
              <span className="progress-bar-name">Проверка</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProgressBar;