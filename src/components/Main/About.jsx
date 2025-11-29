import React from 'react';
import "../Main/main.css";

const About = () => {
  return (
    <section className="about" id="about">
      <h2 className="title-about">О нас</h2>
      <div className="paragraphs">
        <p className="paragraph">
          Мы рады видеть Вас! Мы работаем для Вас с 2003 года. 14 лет мы
          наблюдаем, как с каждым днем всё больше людей заказывают жд билеты
          через интернет.
        </p>
        <p className="paragraph">
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика,
          но стоит ли это делать? Мы расскажем о преимуществах заказа через
          интернет.
        </p>
        <p className="paragraph paragraph-bold">
          Покупать жд билеты дешево можно за 90 суток до отправления поезда.
          Благодаря динамическому ценообразованию цена на билеты в это время
          самая низкая.
        </p>
      </div>
    </section>
  );
};

export default About;