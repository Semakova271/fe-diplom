import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, TextField, Autocomplete } from "@mui/material";
import { setForm } from "../../../features/formTicketsSlice";
import {
  checkboxStyles,
  useInputStyles,
  useAutocompleteStyles,
  CustomSwitch,
} from "./styles";

// Checkbox Component
export const ControlledCheckbox = ({ id, value, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback((event) => {
    setChecked(event.target.checked);
  }, []);

  const isChecked = useMemo(() => 
    id ? value === id : checked,
    [id, value, checked]
  );

  const handleCheckboxChange = useCallback((event) => 
    id ? onChange(event, value) : handleChange(event),
    [id, onChange, value, handleChange]
  );

  return (
    <Checkbox
      sx={checkboxStyles}
      id={id}
      checked={isChecked}
      onChange={handleCheckboxChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

// Input Component
export const ControlledInput = ({ id, type, state, onChangeInput, errorDocs }) => {
  const classes = useInputStyles(errorDocs);

  const placeholder = useMemo(() => {
    const placeholders = {
      date: "ДД/ММ/ГГГГ",
      passport: {
        seria: "_ _ _ _ ",
        number: "_ _ _ _ _ _ "
      },
      certificate: "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"
    };
    return placeholders[type]?.[id] || placeholders[type] || "";
  }, [type, id]);

  const handleChange = useCallback((event) => {
    onChangeInput(event.target.value, id, type);
  }, [onChangeInput, id, type]);

  return (
    <TextField
      id={id}
      type={type}
      className={classes.customStyle}
      placeholder={placeholder}
      value={state}
      onChange={handleChange}
    />
  );
};

// Autocomplete Component
export const ControllableStates = ({
  type,
  value,
  onChangeInput,
  options,
  popupIcon,
  placeholder,
}) => {
  const classes = useAutocompleteStyles();
  const [state, setState] = useState(value);
  const dispatch = useDispatch();

  useEffect(() => {
    setState(value);
  }, [value]);

  const width = useMemo(() => {
    const widths = {
      "Свидетельство о рождении": 444,
      "Паспорт": 280
    };
    return widths[type] || 325;
  }, [type]);

  const className = useMemo(() => 
    type.includes("City") ? classes.muiStyle : classes.customStyle,
    [type, classes]
  );

  const optionNames = useMemo(() => 
    options.map(item => item.name),
    [options]
  );

  const handleChange = useCallback((event, newValue) => {
    setState(newValue);
    if (newValue) {
      dispatch(
        setForm({
          type,
          status: false,
          data: options.find(item => item.name === newValue),
        })
      );
    }
  }, [dispatch, type, options]);

  return (
    <Autocomplete
      className={className}
      id="demo"
      onChange={handleChange}
      popupIcon={popupIcon || null}
      options={optionNames}
      placeholder={placeholder}
      value={state}
      sx={{ width }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          onChange={onChangeInput}
        />
      )}
    />
  );
};

// Re-export CustomSwitch
export { CustomSwitch };

export default {
  ControlledCheckbox,
  ControlledInput,
  ControllableStates,
  CustomSwitch,
};