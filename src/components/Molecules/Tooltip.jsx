import React from "react";

const Tooltip = ({ name, text }) => {
  return (
    <React.Fragment>
      <div className={"services_tooltip tooltip_" + name}>
        <span className={"tooltip_text text_" + name}>{text}</span>
      </div>
    </React.Fragment>
  );
};

export default Tooltip;