import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetCityesNameQuery } from "../../features/myApi";
import { LocationOn } from "@mui/icons-material";
import { Title, Button } from "../../components/commom/Button";
import Info from "../../components/commom/Info";
import FormCalendar from "../commom/ReactCalendar";
import ControllableStates from "../iu/MUI/ControllableStates";
import {
  capitalizeFirstLetter,
  getUrlSearch,
} from "../../utils/trainSelectionUtils";
import ic_arrow from "../../img/ic_arrow.svg";
import { inputValue } from "../../features/formTicketsSlice";
import { setDataRequest, setParameters } from "../../features/catalogTrainsSlice";
import { setReverseData } from "../../features/catalogTrainsSlice";

const MainForm = ({ className }) => {
  const { name } = useSelector((state) => state.formTickets);
  const { from, to } = useSelector((state) => state.formTickets.formData);
  const { parameters, trainsParameters } = useSelector(
    (state) => state.catalogTrains.searchData
  );
  const dispatch = useDispatch();
  const reverseRef = useRef();
  const formRef = useRef();
  const { data = [], isError } = useGetCityesNameQuery(name);
  const navigate = useNavigate();
  const location = useLocation();

  if (isError) console.log(isError, "error!!!");

  let optionsData = [];
  if (data.length > 0) {
    optionsData = data.map((item) => {
      return { ...item, name: capitalizeFirstLetter(item.name) };
    });
  }

  formRef.current = {
    from_city_id: from.city._id,
    from_city_name: from.city.name,
    to_city_id: to.city._id,
    to_city_name: to.city.name,
    date_start: from.date,
    date_end: to.date,
  };

  const filterData = {
    sort: parameters.sort.type,
    limit: parameters.limit,
    offset: parameters.offset,
  };

  const searchOptions = { value: name };
  const urlSearchString = getUrlSearch(
    searchOptions,
    formRef.current,
    filterData,
    trainsParameters
  );

  const clickReverse = () => {
    dispatch(setReverseData());
  };

  const clickHandler = () => {
    dispatch(setDataRequest({ data: { from, to } }));
    dispatch(setParameters({ offset: 0 }));
    if (location.pathname !== `/fe-diplom/trains/${urlSearchString}`)
      navigate({
        pathname: `/fe-diplom/trains/`,
        search: `${urlSearchString}`,
      });
  };

  const onChangeInput = (event) => {
    if (event.target.value !== "")
      dispatch(inputValue({ name: event.target.value }));
  };

  const onClickInfo = () => {
    document.querySelector(".error_card").classList.remove("active");
  };

  return (
    <div className={className}>
      <div className={className + "_destination"}>
        <Title
          className={className + "_departure_title"}
          text="�����������"
        />
        <div ref={reverseRef} className="form-group group-city-name">
          <ControllableStates
            popupIcon={
              <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
            }
            type="startCity"
            value={from.city.name}
            onChangeInput={onChangeInput}
            placeholder="������"
            options={optionsData}
          />
          <button
            type="button"
            className="btn btn-transparent p-0 form_reverse-button"
            onClick={clickReverse}
          >
            <img className="ic_arrow_form" src={ic_arrow} alt="arrow icon" />
          </button>
          <ControllableStates
            type="finishCity"
            value={to.city.name}
            popupIcon={
              <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
            }
            onChangeInput={onChangeInput}
            placeholder="����"
            options={optionsData}
          />
        </div>
      </div>
      <div className={className + "_date-trails"}>
        <Title className={className + "_departure_title"} text="����" />
        <div className="form-group group-date-trails">
          <FormCalendar
            className=""
            value={from.date ? new Date(from.date) : null}
            type="startDate"
          />
          <FormCalendar
            className=""
            value={to.date ? new Date(to.date) : null}
            type="finishDate"
          />
        </div>
      </div>
      <div className={className + "_control"}>
        <Button
          text="����� ������"
          type="main_form"
          onClick={clickHandler}
          disabled={
            from.city.name === "" || to.city.name === "" || !from.date
          }
        />
        {isError && location.pathname === "/fe-diplom" && (
          <Info
            type="error"
            text="���-�� ����� �� ���, �������� ��������..."
            onClick={onClickInfo}
          />
        )}
      </div>
    </div>
  );
};

export default MainForm;