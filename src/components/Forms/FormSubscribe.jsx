import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { validateInputForm } from "../../utils/formsValidator";
import { addSubscriber } from "../../features/passengersSlice";
import "./FormSubscribe.css"; 

const FormSubscribe = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();
    if (inputRef.current) {
      dispatch(addSubscriber({ data: inputRef.current }));
      fetch("https://students.netoservices.ru/fe-diplom/subscribe", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: inputRef.current }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Subscribe error:", error));
    }
  };

  const changeHandler = (event) => {
    const value = event.target.value.trim();
    inputRef.current = validateInputForm(value, "email") ? value : null;
  };

  return (
    <div className="form-row form-subscribe">
      <input
        ref={inputRef}
        type="email" 
        className="form-control subscribe__input"
        id="subscribeEmail"
        aria-label="Email для подписки"
        placeholder="e-mail"
        onChange={changeHandler}
      />
      <button
        className="btn btn-transparent subscribe__btn"
        onClick={clickHandler}
        disabled={!inputRef.current}
      >
        Отправить
      </button>
    </div>
  );
};

export default FormSubscribe;