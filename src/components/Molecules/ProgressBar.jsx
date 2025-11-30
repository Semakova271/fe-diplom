import React from "react";
import { useLocation, useParams } from "react-router-dom";
const ProgressBar = () => {
  const location = useLocation();
  const params = useParams();
 
  if (
    location.pathname === "/fe-diplom" ||
    location.pathname === "/fe-diplom/order-result"
  ) {
    return;
  }

  let step=1;

  if (location.pathname === `/fe-diplom/screening/${params.id}`) {
    step = 4;
  } else if (
    location.pathname === `/fe-diplom/personal_information/${params.id}`
  ) {
    step = 3;
  } else if (
    location.pathname ===
    `/fe-diplom/passengers/${params.id}`
  ) {
    step = 2;
  }

  return (
    <React.Fragment>
      <div className="progress">
        <div className=" progress-bar step-tickets p-0">
          <span className="border-top-step"></span>
          <span className="border-bottom-step"></span>

          <span className="numbering">1</span>
          <span className="progress-bar-name">Билеты</span>
        </div>
        <div
          className={
            step < 2
              ? " progress-bar  step-passenger p-0"
              : " progress-bar  step-passenger p-0 step_active"
          }
        >
          <span className="border-top-step"></span>
          <span className="border-bottom-step"></span>

          <span className="numbering margin-numbering">2</span>
          <span className="progress-bar-name">Пассажиры</span>
        </div>
        <div
          className={
            step < 3
              ? " progress-bar step-pay p-0"
              : " progress-bar step-pay p-0 step_active"
          }
        >
          <span className="border-top-step"></span>
          <span className="border-bottom-step"></span>
          <span className="numbering margin-numbering">3</span>
          <span className="progress-bar-name">Оплата</span>
        </div>
        <div
          className={
            step < 4
              ? " progress-bar step-validate p-0"
              : " progress-bar step-validate p-0 step_active"
          }
        >
          <span className="numbering margin-numbering">4</span>
          <span className="progress-bar-name">Проверка</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProgressBar;