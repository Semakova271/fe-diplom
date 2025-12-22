import React from "react";
import Review from "./Review";
import "./FeedBack.css";

const FeedBack = () => {
  return (
    <section className="feedback" id="feedback">
      <h2 className="feedback__title">Отзывы</h2>
      <div className="feedback__container">
        <Review />
        <div className="feedback__dots">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="feedback__dot"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedBack;