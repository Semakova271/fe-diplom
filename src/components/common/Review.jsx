import React from "react";

const Review = ({ avatar, author, text }) => (
  <div className="card card-feedback-item">
    <div className="card-top ifeedback-item__img-wrap">
      <img
        src={`/assets/${avatar}`}
        className="card feedback__img"
        alt={`Аватар ${author}`}
      />
    </div>
    <div className="card-body p-0 body-feedback">
      <h3 className="card-title feedback-item__author">{author}</h3>
      <blockquote className="feedback-item__text">{text}</blockquote>
    </div>
  </div>
);

export default Review;