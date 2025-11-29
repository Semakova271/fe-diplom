import React from "react";
import { Button, Title } from "../../Atoms/Atoms";
import PassengersForm from "../../Forms/PassengersForm/PassengersForm";

const BlockItem = React.forwardRef(
  ({ id, clickHandler, clickDelete, showInfo }, ref) => {

    return (
      <React.Fragment>
        <div
          ref={ref}
          id={id}
          
          className="passengers-info_block-item block-item"
        >
          <div className="passengers-info_block-item_top">
            <Button
              id={11}
              type={"passengers-info_show"}
              onClick={clickHandler}
            ></Button>
            <Title
              text={"Пассажир " + id}
              className="passengers-info_block-item_title"
            />
            <Button
              type={"passengers-info_delete"}
              onClick={id ? () => clickDelete(id) : null}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3 0.3L6 4.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L4.6 6L0.3 10.3C-0.1 10.7 -0.1 11.3 0.3 11.6L0.4 11.7C0.8 12.1 1.4 12.1 1.7 11.7L6 7.4L10.2 11.6C10.6 12 11.2 12 11.6 11.6C12 11.2 12 10.6 11.6 10.2L7.4 6L11.7 1.7C12.1 1.3 12.1 0.7 11.7 0.4L11.6 0.3C11.2 -0.1 10.6 -0.1 10.3 0.3Z"
                  fill="#928F94"
                />
              </svg>
            </Button>
          </div>
          {showInfo ? (
            <div className="passengers-info_block-item_body">
              <PassengersForm id={id} />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
);

export default BlockItem;
