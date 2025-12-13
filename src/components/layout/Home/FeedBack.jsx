import React from "react";
import "./Feedback.css";
import author1 from "../../../img/auhtor_1.png";
import author2 from "../../../img/author_2.png";

const FeedBack = () => {
  return (
    <section className="feedback" id="feedback">
      <h2 className="feedback__title">отзывы</h2>
      
      <div className="feedback__container">
        <div className="feedback__item">
          <div className="feedback__author-info">
            <img 
              src={author1} 
              alt="Екатерина Вальнова" 
              className="feedback__avatar"
            />
            <h3 className="feedback__author-name">Екатерина Вальнова</h3>
          </div>
          
          <div className="feedback__content">
            <p className="feedback__text">
              <span className="feedback__quote">"</span>
              Доброжелательные подсказки на всех судах помогут правильно заполнить поля и без затруднений убить звена или ж/д билет, даже если вы заказываете онлайн билет впервые.
              <span className="feedback__quote">"</span>
            </p>
          </div>
        </div>
        
        <div className="feedback__item">
          <div className="feedback__author-info">
            <img 
              src={author2} 
              alt="Евгений Стрыкало" 
              className="feedback__avatar"
            />
            <h3 className="feedback__author-name">Евгений Стрыкало</h3>
          </div>
          
          <div className="feedback__content">
            <p className="feedback__text">
              <span className="feedback__quote">"</span>
              СМС сопровождение до посадки Сразу после оплаты ж/д билетов из 3 часа до отправления мы пришлем вам СМС-непомнивание о посадке.
              <span className="feedback__quote">"</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBack;