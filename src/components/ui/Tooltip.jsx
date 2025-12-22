import React from "react";

import PropTypes from "prop-types";
import "./Tooltip.css";

const Tooltip = ({ name, text }) => {
  return (
    <React.Fragment>
      <div 
        className={"services_tooltip tooltip_" + name}
        data-tooltip-id={`tooltip-${name}`}
      >
        <span className={"tooltip_text text_" + name}>{text}</span>
      </div>
    </React.Fragment>
  );
};

Tooltip.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tooltip;