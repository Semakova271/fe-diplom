import React from "react";
import { useLocation } from "react-router-dom";
import { Title } from "../commom/Button";

const Banner = ({ banner, className, children }) => {
  const location = useLocation();

  return (
    <div className={className}>
      {location.pathname === "/fe-diplom" ? (
        <Title
          text="Вся жизнь - "
          strongText="путешествие!"
          className="banner_title"
        />
      ) : null}
      <img src={banner} className="img-banner" alt="train-banner" />
    </div>
  );
};

export default Banner;