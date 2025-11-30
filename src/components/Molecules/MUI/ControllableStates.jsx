import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setForm } from "../../../features/formTicketsSlice";
import { makeStyles } from "@mui/styles";

const ControllableStates = ({
  type,
  value,
  onChangeInput,
  options,
  popupIcon,
  placeholder,
}) => {
  const classes = useStyles();
  const [state, setState] = useState(value);
  const dispatch = useDispatch();

  let width;

  useEffect(() => {
    setState(value);
  }, [value]);
  if (type === "Свидетельство о рождении") {
    width = 444;
  } else if (type === "Паспорт") {
    width = 280;
  } else {
    width = 325;
  }

  return (
    <React.Fragment>
      <Autocomplete
        className={
          type === "startCity" || type === "finishCity"
            ? classes.muiStyle
            : classes.customStyle
        }
        id="demo"
        onChange={(event, newValue) => {
          setState(newValue);

          if (newValue)
            dispatch(
              setForm({
                type: type,
                status: false,
                data: options.find((item) => (item = item.name === newValue)),
              })
            );
        }}
        popupIcon={popupIcon ? popupIcon : null}
        options={options.map((item) => item.name)}
        placeholder={placeholder}
        value={state}
        sx={{
          width: width,

          "& control": { height: 50 },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            onChange={onChangeInput}
          />
        )}
      />{" "}
    </React.Fragment>
  );
};

export default ControllableStates;

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
  muiStyle: {
    "& .MuiOutlinedInput-root": {
      height: 60,
      background: "#fff",
      paddingBottom: 13,
      "& input": {
        height: 15,
      },
      "& fieldset": {
        height: 66,
      },

      "&.Mui-focused fieldset": {
        borderColor: "#ffa800",
        borderWidth: "2px",
      },
      "&.MuiIconButton-root": {
        marginTop: -10,
      },
    },
  },
});