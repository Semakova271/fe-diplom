import React from "react";
import { MySvgIcon } from "./Button";
import icLoadingTrain from "../../img/ic_loading_train.svg";
import icLoadingLine from "../../img/ic_loading_line.svg";

const Loader = () => (
  <div className="loader_block">
    <span className="loader-text text-center">Идет поиск</span>
    <div className="icons_block">
      <MySvgIcon
        type="train"
        className="loader"
        icon={icLoadingTrain}
      />
      <MySvgIcon
        type="line"
        className="loader"
        icon={icLoadingLine}
      />
    </div>
  </div>
);

export default Loader;