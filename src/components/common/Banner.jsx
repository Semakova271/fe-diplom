import React from "react";

const Banner = ({ banner, className, children }) => {
  return (
    <div className={`banner ${className}`}>
      <img src={banner} className="img-banner" alt="Баннер поезда" />
      {children}
    </div>
  );
};

export default Banner;