import React from "react";

export const Button = ({ id, type, text, disabled, onClick, children }) => {
  return (
    <button 
      id={id} 
      className={type + "_btn btn text-center"} 
      disabled={disabled} 
      onClick={onClick}
    >
      {text ? text : children}
    </button>
  );
};

export const Title = ({ text, strongText, className }) => {
  return (
    <h2 className={className ? className : "header-title"}>
      {text}
      <strong className="strong-text">{strongText}</strong>
    </h2>
  );
};

export const Border = ({ className }) => {
  return <div className={className + "-border"}></div>;
};

export const MySvgIcon = ({ type, icon, className }) => {
  return (
    <div className={type + "-svgIcon-wrap"}>
      <img src={icon} alt={""} className={className + "__icon"} />
    </div>
  );
};

export const CardTitle = ({ text, className }) => {
  return <h6 className={className + "_title"}>{text}</h6>;
};