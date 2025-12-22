import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setTrainId,
  setSelectionTrain,
} from "../../features/catalogTrainsSlice";
import { clearDataSeats } from "../../features/passengersSlice";
import TrainsMenuCard from "./TrainsMenuCard";

import { nanoid } from "nanoid";

const TrainsMenu = ({ currentItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  if (!currentItems) {
    return;
  }

  const clickHandler = (id, item) => {
    dispatch(clearDataSeats());
    dispatch(setTrainId({ id: item._id }));
    dispatch(setSelectionTrain({ data: item }));
    navigate({
      pathname: `/fe-diplom/seats/${item._id}`,
      search: location.search,
    });
  };

  return (
    <React.Fragment>
      <div className="card-deck trains-menu-group m-0">
        {currentItems && currentItems.length > 0
          ? currentItems.map((item) => (
              <TrainsMenuCard key={nanoid()} {...item} onClick={clickHandler} />
            ))
          : null}
      </div>
    </React.Fragment>
  );
};

export default TrainsMenu;