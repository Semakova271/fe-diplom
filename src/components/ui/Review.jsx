import React from "react";
import { dataReview } from "../../utils/dataText";

const Review = () => {
  return (
    <div className="card-deck feedback-group">
      {dataReview.map((review) => (
        <div className="card card-feedback-item" key={review.id} id={`feedback${review.id}`}>
          <div className="card-top ifeedback-item__img-wrap">
            <img
              src={review.avatar}
              className="card feedback__img"
              alt="avatar"
            />
          </div>

          <div className="card-body p-0 body-feedback">
            <p className="card-title feedback-item__author">
              {review.author}
            </p>

            <p className="feedback-item__text">
              <span className="quote-left">"</span>
              {review.text}
              <span className="quote-right">"</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;