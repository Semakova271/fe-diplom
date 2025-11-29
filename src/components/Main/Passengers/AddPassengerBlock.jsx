import React from "react";
import { Title, Button } from "../../Atoms/Atoms";

const AddPassenger = ({ state, setState }) => {
  
  const onClick = () => {
    setState((prev) => [...prev, state.length + 1]);
  };
  return (
    <React.Fragment>
      <div className="passengers-info_block-item">
        <div className="passengers-info_block-item_top add-passenger">
          <Title
            text={"Добавить пассажира"}
            className="add-passenger_block-item_title"
          />
          <Button
            type={"add-passenger_btn btn text-center"}
            onClick={onClick}
          ></Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddPassenger;