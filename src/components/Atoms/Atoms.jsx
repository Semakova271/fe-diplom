import React from "react";

export const Button = ({  id, type, text,disabled, onClick, children }) => {
  return (
    <React.Fragment>
    
        <button id={id} className={type + "_btn btn text-center"} disabled={disabled} onClick={onClick}>
          {text? text:children}
        </button>

    </React.Fragment>
  );
};

export const Title = ({ text, strongText, className }) => {
  return (
    <React.Fragment>
      <h2 className={className? className:"header-title"}>
        {text}
        <strong className="strong-text">{strongText}</strong>
      </h2>
    </React.Fragment>
  );
};
export const Border = ({className})=> {
  return <React.Fragment>
    <div className={className+"-border"}></div>
  </React.Fragment>
}

export const MySvgIcon = ({ type, icon, className }) => {
  return (
    <React.Fragment>
      <div className={type + "-svgIcon-wrap "}>
        <img src={icon} alt={""} className={className + "__icon"}/>
      </div>
    </React.Fragment>
  );
};

export const CardTitle = ({ text, className }) => {

  return (
    <React.Fragment>
      <h6 className={className+"_title"}>{text}</h6>
    </React.Fragment>
  );
};