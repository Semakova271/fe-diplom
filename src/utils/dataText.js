import author_1 from "../img/feedback/auhtor_1.jpg";
import author_2 from "../img/feedback/author_2.jpg";


export const optionsPayment = [
  "Банковской картой",
  "PayPal",
  "Visa QIWI Wallet",
];

export const dataReview = [
  {
    id: 1,
    author: "Екатерина Вальнова",
    avatar: author_1,
    text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые",
  },
  {
    id: 2,
    author: "Евгений Стрыкало",
    avatar: author_2,
    text: "СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за три часа до отправления мы пришлем вам СМС-напоминание о поездке.",
  },
];

export const templateText = (data) => {
  let text;
  let count;
  if (data.type === "adult") {
    count = 3 - data.count > 0 ? 3 - data.count : 0;

    text = `Можно добавить ещё ${count} пассажиров`;
  } else if (data.type === "child") {
    count = 3 - data.count > 0 ? 3 - data.count : 0;

    text = `Можно добавить ещё ${count} детей до 10 лет.Своё место в вагоне, как у взрослых, но дешевле в среднем на 50-65% `;
  }
  return text;
};