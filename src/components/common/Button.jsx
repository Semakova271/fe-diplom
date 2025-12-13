import React from "react";
import "./Button.css";

export const Button = ({ id, type, text, disabled = false, onClick, children, className = "" }) => {
  // Для типа "main_form" используем класс "button main_form"
  const buttonClass = type === "main_form" 
    ? `button main_form ${disabled ? 'disabled' : ''} ${className}` 
    : `${type}_btn btn text-center ${className}`;

  return (
    <button
      id={id}
      className={buttonClass.trim()}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {text || children}
    </button>
  );
};

export const Title = ({ text, strongText, className, style }) => (
  <h2 className={className || "header-title"} style={style}>
    {text}
    {strongText && <strong className="strong-text">{strongText}</strong>}
  </h2>
);

export const Border = ({ className }) => (
  <div className={`${className}-border`} />
);

export const MySvgIcon = ({ type, icon, className }) => (
  <div className={`${type}-svgIcon-wrap`}>
    <img src={icon} alt="" className={`${className}__icon`} />
  </div>
);

export const CardTitle = ({ text, className }) => (
  <h6 className={`${className}_title`}>{text}</h6>
);