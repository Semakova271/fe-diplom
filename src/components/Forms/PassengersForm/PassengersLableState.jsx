import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  let width;

  id === "certificate" ? (width = 444) : (width = 280);

  return (
    <React.Fragment>
      <Autocomplete
        className={classes.customStyle}
        id={id}
       
        onChange={(event, newValue) => {
          console.log(id, 'id')
          setState(newValue,id);
        }}
        popupIcon={popupIcon ? popupIcon : null}
        options={options}
        placeholder={placeholder}
        value={value}
        sx={{
          width: width,

          "& control": { height: 50 },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
         
          />
        )}
      />{" "}
    </React.Fragment>
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