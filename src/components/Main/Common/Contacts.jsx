// Contacts.js
const Contacts = () => {
  return (
    <section className="contacts-section">
      <h2 className="contacts__title text-center">Контакты</h2>
      <div className="contacts__content">
        <p className="contacts__address">
          Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17, бизнес-центр W Plaza.
        </p>
        <h5 className="contacts__subtitle text-center">Координаты для связи:</h5>
        <div className="contacts__details">
          <p className="contacts__item">
            Телефон: <a href="tel:+7-495-790-35-03" className="contacts__link">+7 495 79 03 5 03</a>
            <span className="contacts__hours"> (ежедневно: с 09-00 до 21-00)</span>
          </p>
          <p className="contacts__item">
            Email: <a href="mailto:office@bosanoga.ru" className="contacts__link">office@bosanoga.ru</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;