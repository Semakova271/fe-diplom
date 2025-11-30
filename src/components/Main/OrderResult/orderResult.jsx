import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Button, MySvgIcon } from "../../BasicComponents/BasicComponents";
import { Card, CardTop, CardBody } from "../CardsBlock/CardBlock";
import icon_comp from "../../../img/icon_comp.svg";
import icon_tickets from "../../../img/icon_tickets.svg";
import icon_driver from "../../../img/icon_driver.svg";

// Компонент пунктов инструкции
export const Puncts = () => {
  const instructions = [
    {
      icon: icon_comp,
      content: (
        <span>
          Билеты будут отправлены на Ваш
          <strong className="strong-text"> e-mail</strong>
        </span>
      )
    },
    {
      icon: icon_tickets,
      content: (
        <span>
          <strong className="strong-text">распечатайте </strong>и
          сохраняйте билеты до даты поездки
        </span>
      )
    },
    {
      icon: icon_driver,
      content: (
        <span>
          <strong className="strong-text">предъявите </strong>
          распечатанные билеты при посадке
        </span>
      )
    }
  ];

  return (
    <section className="order-result_puncts section">
      <div className="order-result_cards card-desk">
        {instructions.map((instruction, index) => (
          <Card key={index} className="order-result_block-item">
            <CardTop className="order-result_cards-item card">
              <MySvgIcon
                type="order-result_card-top"
                className="order-result"
                icon={instruction.icon}
              />
              {index === 0 ? (
                <CardBody className="order-result cards-item">
                  {instruction.content}
                </CardBody>
              ) : null}
            </CardTop>
            {index > 0 && (
              <CardBody className="order-result cards-item">
                {instruction.content}
              </CardBody>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

// Компонент блока обратной связи
export const ControlBlockFeedBack = ({ amount = [1, 2, 3, 4, 5] }) => {
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(0);

  const handleRatingClick = (id) => {
    setCurrentId(id);
  };

  const StarIcon = ({ filled }) => (
    <svg
      width="46"
      height="44"
      viewBox="0 0 46 44"
      fill={filled ? "white" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div className="control_block">
      <div className="licker_wrap">
        <Title className="licker-block_title" text="Оценить сервис" />
        <div className="licker-block_button-desk">
          {amount.map((item) => (
            <button
              key={item}
              className="licker_btn"
              onClick={() => handleRatingClick(item)}
              aria-label={`Оценка ${item}`}
            >
              <StarIcon filled={item <= currentId} />
            </button>
          ))}
        </div>
      </div>
      <div className="order-result_block-control">
        <Button
          text="Вернуться на главную"
          type="reverse_to_homePage"
          onClick={() => navigate("/fe-diplom")}
        />
      </div>
    </div>
  );
};

// Компонент обращения к пользователю
export const Appeal = ({ data }) => {
  return (
    <div className="appeal_wrap">
      <p className="appeal-text">
        <strong className="strong-text">{data}!</strong>
      </p>
      <p className="appeal-text">
        Ваш заказ успешно оформлен.
        <br />
        В ближайшее время с Вами свяжется наш оператор для подтверждения
      </p>
      <p className="appeal-text">
        <strong className="strong-text">
          Благодарим вас за оказанное доверие и желаем приятного путешествия!
        </strong>
      </p>
    </div>
  );
};

// Композитный экспорт для удобства
export default {
  Puncts,
  ControlBlockFeedBack,
  Appeal
};