import React from "react";
import {  useNavigate } from "react-router-dom";
import { Button } from "../ui/Modules";
import { nanoid } from "nanoid";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="top-sales">
      <h2 className="text-center">Страница не найдена</h2>
      <p>Извините, такая страница не найдена!</p>
      <Button
        key={nanoid()}
        text={"Вернуться на главную"}
        onClick={() => navigate("/fe-diplom")}
      />
    </section>
  );
};

export default NotFound;