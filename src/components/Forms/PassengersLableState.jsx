import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./PassengersLableState.css";

const PassengersLableState = ({
  id,
  type,
  value,
  setState,
  options,
  popupIcon,
  placeholder,
}) => {
  const classes = useStyles();
  
  const width = id === "certificate" ? 444 : 280;

  const handleChange = (event, newValue) => {
    if (setState) {
      setState(newValue, id);
    }
  };

  return (
    <Autocomplete
      className={`${classes.customStyle} passengers-label-state`}
      id={id}
      onChange={handleChange}
      popupIcon={popupIcon}
      options={options || []}
      placeholder={placeholder}
      value={value || ''}
      sx={{
        width: width,
        "& .MuiAutocomplete-inputRoot": {
          height: 50,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
    />
  );
};

export default PassengersLableState;

const useStyles = makeStyles({
  customStyle: {
    "& .MuiOutlinedInput-root": {
      height: 50,
      paddingBottom: 13,
      "& input": {
        height: 15,
      },
      "& fieldset": {
        height: 50,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa800",
        borderWidth: "2px",
      },
    },
  },
});