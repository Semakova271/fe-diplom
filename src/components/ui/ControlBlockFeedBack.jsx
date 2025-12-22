import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Button } from "./Modules";
import "./ControlBlockFeedBack.css"

const ControlBlockFeedBack = ({ amount }) => {
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(0);
  const clickHandler = (id) => {
    setCurrentId(id);
  };

  return (
    <React.Fragment>
      <div className="control_block">
        <div className="licker_wrap">
          <Title className="licker-block_title" text={"Оценить сервис"} />
          <div className="licker-block_button-desk">
            {amount.length > 0 &&
              amount.map((item) => {
                return (
                  <button
                    className="licker_btn"
                    key={item}
                    id={item}
                    onClick={() => clickHandler(item)}
                  >
                    <svg
                      width="46"
                      height="44"
                      viewBox="0 0 46 44"
                      fill={item > currentId ? "none" : "white"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                );
              })}
          </div>
        </div>
        <div className="order-result_block-control">
          <Button
            text="Вернуться на главную"
            type="reverse_to_homePage"
            onClick={() => navigate("/fe-diplom")}
          ></Button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ControlBlockFeedBack;
