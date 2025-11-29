import "../Main/main.css";

const About = () => {
  return (
    <section className="about" id="about">
     
      <h2 className="text-left about-title">О нас</h2>
      
      <div className="text-left">
      <div className="border-left-about"></div>
        {" "}
        <p className="paragraph">
          {" "}
          Мы рады видеть Вас! Мы работаем для Вас с 2003года. 14 лет мы
          наблюдаем как с каждым днем всё больше людей заказывают жд билеты
          через интернет.
        </p>
        <p className="paragraph">
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика,
          но стоит ли это делать? Мы расскажем о преимуществах заказа через
          интернет.
        </p>
        <p className="paragraph-bold">
          Покупать жд билеты дешево можно за 90 суток до отправления поезда.
          Благодаря динамическому ценообразованию цена на билеты в это время
          самая низкая.
        </p>
      </div>
    </section>
  );
};

export default About;