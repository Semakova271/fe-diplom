import React from "react";
import {dataReview} from  "../../utils/dataText";

const Review = () => {
    return (
      <React.Fragment>
        <div className="card-deck feedback-group">
          <div className="card card-feedback-item" id="feedback1">
            <div className="card-top ifeedback-item__img-wrap">
              <img
                src={dataReview[0].avatar}
                className="card feedback__img"
                alt="avatar"
              />
            </div>
  
            <div className="card-body p-0 body-feedback">
              <p className="card-title feedback-item__author">{dataReview[0].author}</p>
  
              <p className="feedback-item__text">
                <svg
                  className="quote-left"
                  width="13"
                  height="10"
                  viewBox="0 0 13 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.11523 0.542969L6.29492 1.89648C5.22852 3.45508 4.67773 5.07812 4.64258 6.76562V9.4375H0.898438V7.01172C0.910156 5.88672 1.21484 4.71484 1.8125 3.49609C2.42188 2.26562 3.18945 1.28125 4.11523 0.542969ZM10.0215 0.542969L12.2012 1.89648C11.1348 3.45508 10.584 5.07812 10.5488 6.76562V9.4375H6.80469V7.01172C6.81641 5.88672 7.12109 4.71484 7.71875 3.49609C8.32812 2.26562 9.0957 1.28125 10.0215 0.542969Z"
                    fill="#928F94"
                  />
                </svg>
  
                {dataReview[0].text}
                <svg
                  className="quote-right"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.30469 9L0.125 7.64648C1.17969 6.11133 1.72461 4.48828 1.75977 2.77734V0H5.50391V2.42578C5.50391 3.63281 5.19336 4.85156 4.57227 6.08203C3.96289 7.30078 3.20703 8.27344 2.30469 9ZM8.17578 9L5.99609 7.64648C7.05078 6.11133 7.5957 4.48828 7.63086 2.77734V0H11.375V2.42578C11.375 3.63281 11.0645 4.85156 10.4434 6.08203C9.83398 7.30078 9.07812 8.27344 8.17578 9Z"
                    fill="#928F94"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="card card-feedback-item" id="feedback2">
            <div className="card-top ifeedback-item__img-wrap">
              <img
                src={dataReview[1].avatar}
                className="card feedback__img"
                alt="avatar"
              />
            </div>
  
            <div className="card-body p-0 body-feedback">
              <p className="card-title feedback-item__author">{dataReview[1].author}</p>
  
              <p className="feedback-item__text">
                {" "}
                <svg
                  className="quote-left"
                  width="13"
                  height="10"
                  viewBox="0 0 13 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.11523 0.542969L6.29492 1.89648C5.22852 3.45508 4.67773 5.07812 4.64258 6.76562V9.4375H0.898438V7.01172C0.910156 5.88672 1.21484 4.71484 1.8125 3.49609C2.42188 2.26562 3.18945 1.28125 4.11523 0.542969ZM10.0215 0.542969L12.2012 1.89648C11.1348 3.45508 10.584 5.07812 10.5488 6.76562V9.4375H6.80469V7.01172C6.81641 5.88672 7.12109 4.71484 7.71875 3.49609C8.32812 2.26562 9.0957 1.28125 10.0215 0.542969Z"
                    fill="#928F94"
                  />
                </svg>
                {dataReview[1].text}
                <svg
                  className="quote-right"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.30469 9L0.125 7.64648C1.17969 6.11133 1.72461 4.48828 1.75977 2.77734V0H5.50391V2.42578C5.50391 3.63281 5.19336 4.85156 4.57227 6.08203C3.96289 7.30078 3.20703 8.27344 2.30469 9ZM8.17578 9L5.99609 7.64648C7.05078 6.11133 7.5957 4.48828 7.63086 2.77734V0H11.375V2.42578C11.375 3.63281 11.0645 4.85156 10.4434 6.08203C9.83398 7.30078 9.07812 8.27344 8.17578 9Z"
                    fill="#928F94"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  
  export default Review;