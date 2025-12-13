import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validateInputForm } from "../../utils/formsValidator";
import { addSubscriber } from "../../features/passengersSlice";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputForm(email, "email")) return;

    try {
      dispatch(addSubscriber({ data: email }));
      
      const response = await fetch("https://students.netoservices.ru/fe-diplom/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEmail("");
      }
    } catch (error) {
      console.error("Subscribe error:", error);
    }
  };

  return (
    <form className="form-row form-subscribe" onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control subscribe__input"
        value={email}
        onChange={handleChange}
        placeholder="e-mail"
        aria-label="Email для подписки"
      />
      <button type="submit" className="btn btn-transparent subscribe__btn">
        Отправить
      </button>
    </form>
  );
};

export default SubscribeForm;