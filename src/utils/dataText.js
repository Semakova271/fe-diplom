
export const optionsPayment = [
  "Банковской картой",
  "PayPal",
  "Visa QIWI Wallet",
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