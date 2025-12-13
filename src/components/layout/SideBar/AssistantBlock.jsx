import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SideBarForm from "../../Forms/SideBarForm";
import RangeSlider from "./CustomSlider";
import CustomSwitch from "../../iu/MUI/CustomSwitch";
import { CardTitle, MySvgIcon, Button } from "../../common/Button";
import Timing from "../../modules/SelectionTrain/components/Timing";
import TripDetails from "../../modules/SelectionTrain/components/TripDetails";
import Tooltip from "../../common/Tooltip";
import { parsedUrlString, getUrlSearch } from "../../../utils/trainSelectionUtils";
import { setTrainsParameters } from "../../../features/catalogTrainsSlice";
import icon_arrow from "../../../img/ic_arrow.svg";
import icon_second_class from "../../../img/ic_second_class.svg";
import icon_fourth_class from "../../../img/ic_fourth_class.svg";
import icon_third_class from "../../../img/ic_third_class.svg";
import icon_rocket from "../../../img/ic_rocket.svg";
import icon_star from "../../../img/ic_star.svg";
import icon_wifi from "../../../img/ic_wifi.svg";
import "./sidebar.css";

/* Боковая панель, выбор поездки по параметрам*/
const AssistantBlock = () => {
  const { from, to } = useSelector(
    (state) => state.catalogTrains.searchData.travelData
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let upData = parsedUrlString(location.search);

  const handleChangeSwitch = (event) => {
    const inputName = event.target.name;
    const checked = event.target.checked;
    if (
      from.date &&
      from.city.name &&
      to.city.name &&
      location.pathname === "/fe-diplom/trains"
    )
      dispatch(
        setTrainsParameters({ data: { name: inputName, status: checked } })
      );

    let newValue = Object.keys(upData.parameters).find((key) =>
      key.includes(inputName)
    );

    upData.parameters[newValue] = checked;
    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );
    navigate({
      search: `${urlSearchString}`,
    });
  };

  return (
    <React.Fragment>
      <div className="assistant-block_wrap">
        <SideBarForm from={from.date} to={to.date} />
        
        {/* SwitchBlock component integrated */}
        <div className="sidebar-switch-block">
          <FormGroup>
            <div className="sidebar-switch-block-form-item">
              <MySvgIcon
                type={"sidebar-switchbox"}
                icon={icon_second_class}
                className="second-class"
              />
              <FormControlLabel
                control={<CustomSwitch />}
                labelPlacement="start"
                onChange={handleChangeSwitch}
                name={"second"}
                label="Купе"
                checked={trainsParameters.have_second_class}
              />
            </div>
            <div className="sidebar-switch-block-form-item">
              <MySvgIcon
                type={"sidebar-switchbox"}
                icon={icon_third_class}
                className="third-class"
              />
              <FormControlLabel
                control={
                  <CustomSwitch format={{ height: 38, width: 72, padding: 6 }} />
                }
                labelPlacement="start"
                onChange={handleChangeSwitch}
                name={"third"}
                label="Плацкарт"
                checked={trainsParameters.have_third_class}
              />
            </div>
            <div className="sidebar-switch-block-form-item">
              <MySvgIcon
                type={"sidebar-switchbox"}
                icon={icon_fourth_class}
                className="fourth-class"
              />
              <FormControlLabel
                control={<CustomSwitch />}
                labelPlacement="start"
                onChange={handleChangeSwitch}
                name={"fourth"}
                label="Сидячий"
                checked={trainsParameters.have_fourth_class}
              />
            </div>
            <div className="sidebar-switch-block-form-item">
              <MySvgIcon
                type={"sidebar-switchbox"}
                icon={icon_star}
                className="first-class"
              />
              <FormControlLabel
                control={<CustomSwitch />}
                labelPlacement="start"
                onChange={handleChangeSwitch}
                name={"first"}
                label="Люкс"
                checked={trainsParameters.have_first_class}
              />
            </div>
            <div className="sidebar-switch-block-form-item">
              <MySvgIcon
                type={"sidebar-switchbox"}
                icon={icon_wifi}
                className="wifi"
              />
              <FormControlLabel
                control={<CustomSwitch />}
                labelPlacement="start"
                onChange={handleChangeSwitch}
                name={"wifi"}
                label="Wi-Fi"
                checked={trainsParameters.have_wifi}
              />
            </div>
            <div className="sidebar-switch-block-form-item">
              <MySvgIcon
                type={"sidebar-switchbox"}
                icon={icon_rocket}
                className="express"
              />
              <FormControlLabel
                control={<CustomSwitch />}
                labelPlacement="start"
                onChange={handleChangeSwitch}
                name={"express"}
                label="Экспресс"
                checked={trainsParameters.have_express}
              />
            </div>
          </FormGroup>
        </div>
        
        {/* PriceBlock component integrated */}
        <div className="sidebar-price-block">
          <CardTitle text={"Стоимость"} className="sidebar-price-block" />
          <div className="sidebar-price-block_description">
            <span className="sidebar-price-block_text">от</span>
            <span className="sidebar-price-block_text">до</span>
          </div>
          <RangeSlider
            min={500}
            max={9000}
            height={19}
            step={100}
            type={"price"}
            start={price_from}
            end={price_to}
          />
        </div>
        
        {/* SideBlock components integrated */}
        <SideBlockComponent type="departure" date={from.date} side="start" />
        <SideBlockComponent type="arrival" date={to.date} side="end" />
      </div>
    </React.Fragment>
  );
};

// Integrated SideBlock component as internal function
const SideBlockComponent = ({ type, data, date, side, children, parent, onChange }) => {
  const [showTiming, setShowTiming] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const basedClasses =
    type === "departure" ? "sidebar-block-departure" : "sidebar-block-arrival";

  useEffect(() => {
    if (date) setShowTooltip(false);
  }, [date]);
  
  const clickHandler = (type) => {
    date ? setShowTiming(!showTiming) : setShowTooltip(!showTooltip);
  };

  return (
    <React.Fragment>
      <div className={"sidebar-side-block " + basedClasses}>
        <div className="sidebar-side-block_header">
          {showTooltip ? (
            <Tooltip
              name={"side_block_" + type}
              text={
                "Выберите дату " +
                (side === "start" ? "отправления" : "возвращения")
              }
            />
          ) : null}
          <MySvgIcon
            type="sidebar-side-block"
            icon={icon_arrow}
            className={basedClasses + "_arrow"}
          />
          <CardTitle
            text={type === "departure" ? "Туда" : "Обратно"}
            className="sidebar-side-block"
          />
          {data && data.departure.from.date ? (
            <span className="sidebar-side-block_date">
              {data.departure.from.date}
            </span>
          ) : null}
          <Button type="sidebar-side-block" onClick={() => clickHandler(type)}>
            {showTiming ? (
              <i className="fa fa-minus" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-plus" aria-hidden="true"></i>
            )}
          </Button>
        </div>
        {showTiming && !data && !parent ? (
          <Timing type={type} onChangeHandler={onChange} />
        ) : null}
        {showTiming && parent && <TripDetails />}
        {children ? children : null}
      </div>
    </React.Fragment>
  );
};

export default AssistantBlock;