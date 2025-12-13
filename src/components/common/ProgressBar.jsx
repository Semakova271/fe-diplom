import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  const params = useParams();

  if (location.pathname === "/fe-diplom" || location.pathname.includes("order-result")) {
    return null;
  }

  const getCurrentStep = () => {
    if (location.pathname.includes("screening")) return 4;
    if (location.pathname.includes("personal_information")) return 3;
    if (location.pathname.includes("passengers")) return 2;
    return 1;
  };

  const currentStep = getCurrentStep();

  const steps = [
    { number: 1, name: "Билеты" },
    { number: 2, name: "Пассажиры" },
    { number: 3, name: "Оплата" },
    { number: 4, name: "Проверка" },
  ];

  return (
    <div className="progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const hasBorder = stepNumber < 4;
        const hasMargin = stepNumber > 1;

        return (
          <div
            key={step.number}
            className={`progress-bar step-${step.name.toLowerCase()} p-0 ${isActive ? "step_active" : ""}`}
          >
            {hasBorder && (
              <>
                <span className="border-top-step" />
                <span className="border-bottom-step" />
              </>
            )}
            <span className={`numbering ${hasMargin ? "margin-numbering" : ""}`}>
              {step.number}
            </span>
            <span className="progress-bar-name">{step.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;