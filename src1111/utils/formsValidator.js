export const validateDataPassengers = (obj) => {
  return Object.values(obj).some((item) => item === "");
};

export const validateInputForm = (value, type) => {
  let reg;
  if (type === "certificate") {
    reg = /^[A-Z]{4}-[А-Я]{2}-[0-9]{6}$/;
  } else if (type === "email") {
    reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  } else if (type === "phone") {
    reg = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
  }

  return reg.test(value);
};

export const validatePass = (arr) => {
  const result = arr.every((item) => item.seat && item.dataPass);

  return result;
};