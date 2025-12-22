import React from 'react';
import "./About.css";

const About = () => {
  const content = [
    {
      text: 'Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.',
    },
    {
      text: 'Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.',
    },
    {
      text: 'Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.',
    },
  ];

  return (
    <section id="about" className="about">
      <h2 className="about__title">о нас</h2>
      <div className="about__content">
        {content.map((item, idx) => (
          <p className="about__text" key={idx}>
            {item.text}
          </p>
        ))}
      </div>
    </section>
  );
}

export default About;