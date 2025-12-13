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
  const [state, setState] = useState(value || "");
  const dispatch = useDispatch();

  let width;

  useEffect(() => {
    setState(value || "");
  }, [value]);
  
  if (type === "Свидетельство о рождении") {
    width = 444;
  } else if (type === "Паспорт") {
    width = 280;
  } else {
    width = 325;
  }

  const handleChange = (event, newValue) => {
    console.log(`ControllableStates ${type}:`, {
      newValue,
      options: options?.slice(0, 3), // покажем первые 3 опции для отладки
      allOptions: options
    });
    
    setState(newValue || "");
    
    if (newValue && options) {
      // Ищем полный объект по имени
      const selectedOption = options.find((item) => {
        // Сравниваем без учета регистра и лишних пробелов
        return item.name && newValue && 
               item.name.trim().toLowerCase() === newValue.trim().toLowerCase();
      });
      
      console.log(`Найденная опция для ${type}:`, selectedOption);
      
      if (selectedOption) {
        dispatch(
          setForm({
            type: type,
            status: true,
            data: {
              _id: selectedOption._id || "",
              name: selectedOption.name || newValue
            }
          })
        );
      } else {
        // Если не нашли в options, сохраняем только имя
        console.warn(`Город "${newValue}" не найден в options`);
        dispatch(
          setForm({
            type: type,
            status: true,
            data: {
              _id: "",
              name: newValue
            }
          })
        );
      }
    } else if (!newValue) {
      // Очистка поля
      console.log(`Очистка поля ${type}`);
      dispatch(
        setForm({
          type: type,
          status: true,
          data: { _id: "", name: "" }
        })
      );
    }
  };

  const handleInputChange = (event, newInputValue) => {
    console.log(`Input change ${type}:`, newInputValue);
    setState(newInputValue);
    if (onChangeInput) {
      onChangeInput({
        target: { value: newInputValue }
      });
    }
  };

  return (
    <React.Fragment>
      <Autocomplete
        className={
          type === "startCity" || type === "finishCity"
            ? classes.muiStyle
            : classes.customStyle
        }
        id={`autocomplete-${type}`}
        onChange={handleChange}
        onInputChange={handleInputChange}
        popupIcon={popupIcon ? popupIcon : null}
        options={options ? options.map((item) => item.name || "") : []}
        placeholder={placeholder}
        value={state}
        inputValue={state}
        freeSolo={false}
        clearOnBlur={false}
        sx={{
          width: width,
          "& .MuiOutlinedInput-root": { 
            height: type === "startCity" || type === "finishCity" ? 60 : 50 
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
          />
        )}
      />
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
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa800",
        borderWidth: "2px",
      },
    },
  },
});