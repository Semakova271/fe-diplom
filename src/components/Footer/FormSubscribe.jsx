import React, { useState } from "react";

const FormSubscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="subscribe-input"
        placeholder="e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="subscribe-button">
        ОТПРАВИТЬ
      </button>
    </form>
  );
};

export default FormSubscribe;