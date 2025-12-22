import author_1 from "../img/auhtor_1.png";
import author_2 from "../img/author_2.png";


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
    text: "Доброжелательные подсказки\nна всех этапах помогут правильно заполнить\nполя и без затруднений купить авиа или ж/д\nбилет, даже если вы заказываете онлайн билет впервые.",
  },
  {
    id: 2,
    author: "Евгений Стрыкало",
    avatar: author_2,
    text: "СМС-сопровождение до посадки\nСразу после оплаты ж/д билетов\nи за 3 часа до отправления мы пришлем вам\nСМС-напоминание о поездке.",
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