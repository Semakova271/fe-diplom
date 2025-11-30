import React from "react";
import { MySvgIcon } from "../Atoms/Atoms";
import ic_loading_train from "../../img/loading/ic_loading_train.svg";
import ic_loading_line from "../../img/loading/ic_loading_line.svg";

const Loader = () => {
  return (
    <React.Fragment>
      <div className="loader_block">
        <span className="loader-text text-center">Идет поиск</span>
        <div className="icons_block">
          <MySvgIcon
            type="train"
            className={"loader"}
            icon={ic_loading_train}
          />

          <MySvgIcon
            type="line"
            className={"loader"}
            icon={ic_loading_line}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loader;
/**https://drive.google.com/file/d/1IglNGzP2yPF_9zHFoGtLeAlcPfdmalSp/view */