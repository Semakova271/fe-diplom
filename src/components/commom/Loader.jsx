import React from "react";
import { MySvgIcon } from "../commom/Button";
import ic_loading_train from "../../img/ic_loading_train.svg";
import ic_loading_line from "../../img/ic_loading_line.svg";

const Loader = () => {
  return (
    <div className="loader_block">
      <span className="loader-text text-center">Идет поиск</span>
      <div className="icons_block">
        <MySvgIcon
          type="train"
          className="loader"
          icon={ic_loading_train}
        />
        <MySvgIcon
          type="line"
          className="loader"
          icon={ic_loading_line}
        />
      </div>
    </div>
  );
};

export default Loader;