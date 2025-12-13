import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setForm } from "../../features/formTicketsSlice"; // Добавляем импорт
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../forms/form.css";
import ruLocale from "date-fns/locale/ru";
import { getDate, isThisMonth, isSunday, isBefore } from "date-fns";
import { dateFormatted } from "../../utils/trainSelectionUtils";

const FormCalendar = ({ value, type, className }) => {
  const [date, setDate] = useState(value);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setDate(value);
  }, [value]);

  const getDayClasses = (date) => {
    const classes = [];
    
    if (isSunday(date)) classes.push("sunday_date");
    classes.push(isThisMonth(date) ? "current-month_day" : "outside_day");
    if (isBefore(getDate(date), getDate(new Date()))) classes.push("before_day");
    
    return classes.join(" ");
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    
    // Обновляем состояние формы через setForm
    dispatch(setForm({
      type: type,
      data: newDate ? dateFormatted(newDate) : null,
      status: true
    }));
  };

  return (
    <DatePicker
      showIcon
      selected={date}
      onChange={handleDateChange}
      placeholderText="дд/мм/гггг"
      dateFormat="dd/MM/yyyy"
      className={`${className} form-calendar`}
      locale={ruLocale}
      dayClassName={getDayClasses}
      minDate={new Date()}
      showDisabledMonthNavigation
    />
  );
};

export default FormCalendar;