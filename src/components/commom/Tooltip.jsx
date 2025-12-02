import React from "react";

const Tooltip = ({ name, text }) => {
  return (
    <div className={"services_tooltip tooltip_" + name}>
      <span className={"tooltip_text text_" + name}>{text}</span>
    </div>
  );
};

export default Tooltip;