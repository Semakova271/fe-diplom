import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { validateInputForm } from "../../utils/formsValidator";
import { addSubscriber } from "../../features/passengersSlice";

const FormSubscribe = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();
    if (inputRef.current) dispatch(addSubscriber({ data: inputRef.current }));
    fetch("https://students.netoservices.ru/fe-diplom/subscribe", {
      method: "POST",
      body: JSON.stringify({ email: inputRef.current }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const changeHandler = (event) => {
    event.preventDefault();
    inputRef.current = validateInputForm(event.target.value, "email")
      ? event.target.value
      : null;
  };
  return (
    <React.Fragment>
      <div className="form-row form-subscribe">
        <input
          ref={inputRef}
          type="text"
          className="form-control subscribe__input"
          id="exampleInputSubscribe"
          aria-describedby="fromSubscribe"
          placeholder="e-mail"
          onChange={changeHandler}
        />
        <button
          className="btn btn-transparent subscribe__btn"
          onClick={clickHandler}
        >
          Отправить
        </button>
      </div>
    </React.Fragment>
  );
};

export default FormSubscribe;