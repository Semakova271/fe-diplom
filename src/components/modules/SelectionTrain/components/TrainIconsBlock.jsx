import React from "react";

const CardIconsBlock = ({ wifi, express, className }) => {

  return (
    <React.Fragment>
      <div
        className={
          className
            ? className
            : "card-trains-menu-item__icons-block text-right mr-2"
        }
      >
        {wifi && (
          <i className="fa fa-wifi card-icon_wifi  ml-2" aria-hidden="true"></i>
        )}

        {express && (
          <img
            className="icon_rocket card-icon_rocket ml-2"
            src="https://cdn.onlinewebfonts.com/svg/download_535427.png"
            alt="icon rocket"
          />
        )}

        <i
          className="fa fa-coffee card-icon_coffee ml-2"
          aria-hidden="true"
        ></i>
      </div>
    </React.Fragment>
  );
};

export default CardIconsBlock;
