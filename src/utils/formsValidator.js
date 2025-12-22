export const validateDataPassengers = (obj) => {
  // Проверка на пустые значения или строки только из пробелов
  return Object.values(obj).some((item) => 
    item === "" || (typeof item === "string" && item.trim() === "")
  );
};

export const validateInputForm = (value, type) => {
  if (!value || typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();
  
  // Общие проверки для всех типов
  if (trimmedValue === "") {
    return false;
  }

  let reg;
  
  switch(type) {
    case "certificate":
      // Свидетельство о рождении: IV-ХС-123456
      // Используем русские буквы без Ё в диапазоне
      reg = /^[IVXLCDM]{1,4}-[А-Я]{2}-[0-9]{6}$/;
      break;
      
    case "email":
      // Более строгая проверка email
      reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // Дополнительная проверка длины домена
      if (reg.test(trimmedValue)) {
        const domainPart = trimmedValue.split('@')[1];
        return domainPart.length >= 3 && !domainPart.startsWith('.') && !domainPart.endsWith('.');
      }
      return false;
      
    case "phone":
      // Российские и международные номера телефонов
      reg = /^(\+?[78][-\s]?)?(\(?\d{3}\)?[-\s]?)?[\d\s-]{7,10}$/;
      // Проверка минимальной длины цифр
      const digits = trimmedValue.replace(/\D/g, '');
      return reg.test(trimmedValue) && digits.length >= 10 && digits.length <= 15;
      
    case "name":
      // Имя, фамилия, отчество (кириллица, дефис, апостроф)
      // Исправляем регулярное выражение: проверяем Ё отдельно
      const nameRegex = /^[А-ЯЁ][а-яё'-]+$/;
      return nameRegex.test(trimmedValue) && trimmedValue.length >= 2;
      
    case "date":
      // Дата в формате YYYY-MM-DD
      reg = /^\d{4}-\d{2}-\d{2}$/;
      if (reg.test(trimmedValue)) {
        const date = new Date(trimmedValue);
        const today = new Date();
        return date <= today && date.getFullYear() > 1900;
      }
      return false;
      
    case "passport":
      // Паспорт РФ: 4 цифры серии, 6 цифр номера
      reg = /^\d{4}\s?\d{6}$/;
      return reg.test(trimmedValue.replace(/\s/g, ''));
      
    default:
      return false;
  }
  
  return reg.test(trimmedValue);
};

export const validatePass = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return false;
  }

  return arr.every((item) => {
    // Проверяем, что есть место и данные пассажира
    if (!item.seat || !item.dataPass) {
      return false;
    }
    
    const { info, docs } = item.dataPass;
    
    // Проверка обязательных полей инфо
    if (!info || validateDataPassengers({
      first_name: info.first_name,
      last_name: info.last_name,
      date_birth: info.date_birth,
      gender: info.gender
    })) {
      return false;
    }
    
    // Проверка данных документа
    if (!docs || !docs.type_docs || !docs.data_docs) {
      return false;
    }
    
    const { type_docs, data_docs } = docs;
    
    // В зависимости от типа документа применяем разную валидацию
    if (type_docs.id === "certificate") {
      return validateInputForm(data_docs.number, "certificate");
    } else if (type_docs.id === "passport") {
      const passportNumber = `${data_docs.seria || ''}${data_docs.number || ''}`;
      return validateInputForm(passportNumber, "passport");
    }
    
    return false;
  });
};

// Дополнительные утилиты валидации
export const validateField = (value, fieldName) => {
  switch(fieldName) {
    case 'first_name':
    case 'last_name':
    case 'patronymic':
      return validateInputForm(value, 'name');
      
    case 'date_birth':
      return validateInputForm(value, 'date');
      
    case 'email':
      return validateInputForm(value, 'email');
      
    case 'phone':
      return validateInputForm(value, 'phone');
      
    default:
      return value && value.trim() !== '';
  }
};

export const getValidationMessage = (fieldName, value) => {
  if (!value || value.trim() === '') {
    return 'Поле обязательно для заполнения';
  }
  
  switch(fieldName) {
    case 'first_name':
    case 'last_name':
    case 'patronymic':
      if (!validateInputForm(value, 'name')) {
        return 'Допустимы только русские буквы, дефис и апостроф. Первая буква должна быть заглавной';
      }
      break;
      
    case 'date_birth':
      if (!validateInputForm(value, 'date')) {
        return 'Введите корректную дату рождения';
      }
      break;
      
    case 'email':
      if (!validateInputForm(value, 'email')) {
        return 'Введите корректный email адрес';
      }
      break;
      
    case 'phone':
      if (!validateInputForm(value, 'phone')) {
        return 'Введите корректный номер телефона';
      }
      break;
  }
  
  return '';
};

// Проверка возраста (для детского билета)
export const validateAge = (dateString, ageType) => {
  if (!dateString || !validateInputForm(dateString, 'date')) {
    return false;
  }
  
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (ageType === "Детский") {
    return age >= 0 && age <= 12;
  } else if (ageType === "Взрослый") {
    return age >= 18;
  }
  
  return age >= 0;
};

// Новые функции для валидации имен с правильными регулярными выражениями
export const validateName = (value) => {
  if (!value || value.trim() === '') return false;
  
  const trimmedValue = value.trim();
  // Правильное регулярное выражение для русских имен с Ё
  const nameRegex = /^[А-ЯЁ][а-яё'-]+$/;
  
  return nameRegex.test(trimmedValue) && trimmedValue.length >= 2;
};

export const validatePassportSeries = (value) => {
  if (!value) return false;
  const seriesRegex = /^\d{4}$/;
  return seriesRegex.test(value.trim());
};

export const validatePassportNumber = (value) => {
  if (!value) return false;
  const numberRegex = /^\d{6}$/;
  return numberRegex.test(value.trim());
};