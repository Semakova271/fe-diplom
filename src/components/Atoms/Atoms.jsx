import React from "react";

export const Button = ({ 
  id, 
  type = "primary", 
  text, 
  disabled = false, 
  onClick, 
  children,
  className = "",
  ...props 
}) => {
  const buttonClass = `${type}_btn btn text-center ${className}`.trim();
  
  return (
    <button 
      id={id}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {text || children}
    </button>
  );
};

export const Title = ({ 
  text, 
  strongText, 
  className = "header-title",
  as: Component = "h2" 
}) => {
  return (
    <Component className={className}>
      {text}
      {strongText && <strong className="strong-text">{strongText}</strong>}
    </Component>
  );
};

export const Border = ({ className = "" }) => (
  <div className={`${className}-border`} />
);

export const MySvgIcon = ({ 
  type, 
  icon, 
  className = "",
  alt = "",
  ...props 
}) => (
  <div className={`${type}-svgIcon-wrap`}>
    <img 
      src={icon} 
      alt={alt} 
      className={`${className}__icon`}
      {...props}
    />
  </div>
);

export const CardTitle = ({ 
  text, 
  className = "",
  as: Component = "h6" 
}) => (
  <Component className={`${className}_title`}>
    {text}
  </Component>
);

Button.defaultProps = {
  type: "primary",
  disabled: false,
  className: ""
};

Title.defaultProps = {
  className: "header-title",
  as: "h2"
};

Border.defaultProps = {
  className: ""
};

MySvgIcon.defaultProps = {
  className: "",
  alt: ""
};

CardTitle.defaultProps = {
  className: "",
  as: "h6"
};