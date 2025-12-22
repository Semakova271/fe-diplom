import React from "react";
import { useSelector } from "react-redux";
import { CardTitle } from "../ui/Modules";
import FormCalendar from "../ui/Calendar";
import "./FormSideBar.css"; 

const FormSideBar = () => {
  const { from, to } = useSelector((state) => state.formTickets.formData);

  return (
    <div className="form-sidebar-block">
      <div className="form-sidebar-block_departure">
        <CardTitle
          className="form-sidebar-block_title"
          text="Дата поездки"
        />
        <FormCalendar
          className="sidebar_form"
          value={from.date ? new Date(from.date) : null}
        />
      </div>
      <div className="form-sidebar-block_arrival">
        <CardTitle
          className="form-sidebar-block_title"
          text="Дата возвращения"
        />
        <FormCalendar
          className="sidebar_form"
          value={to.date ? new Date(to.date) : null}
        />
      </div>
    </div>
  );
};

export default FormSideBar;