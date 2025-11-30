import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setForm } from "../../features/formTicketsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Forms/form.css";
import ruLocale from "date-fns/locale/ru";
import { getDate, isThisMonth, isSunday, isBefore } from "date-fns";
import { dateFormatted } from "../../utils/trainSelectionUtils";

const FormCalendar = ({ value, type, className }) => {
  const [date, setDate] = useState(value);
  const dispatch = useDispatch();
  const getClasses = (date) => {
    let basedClasses;
    basedClasses = isSunday(date) ? "sunday_date" : "";
    basedClasses = isThisMonth(date)
      ? basedClasses + " current-month_day"
      : basedClasses + " outside_day";
    basedClasses = isBefore(getDate(date), getDate(new Date()))
      ? (basedClasses = " before_day " + basedClasses)
      : basedClasses;

    return basedClasses;
  };

  return (
    <React.Fragment>
      <DatePicker
        showIcon
        selected={date}
        value={new Date(date)}
        onChange={(newDate) => {
          setDate(newDate);
          dispatch(
            setForm({ type: type, status: false, data: dateFormatted(newDate) })
          );
        }}
        placeholderText="ДД/ММ/ГГГГ"
        dateFormat="dd/MM/yyyy"
        className={className + " form-calendar"}
        locale={ruLocale}
        dayClassName={(date) => getClasses(date)}
        minDate={new Date()}
        showDisabledMonthNavigation
      />
    </React.Fragment>
  );
};

export default FormCalendar;