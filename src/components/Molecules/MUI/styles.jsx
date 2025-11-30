import { styled, makeStyles } from "@mui/styles";

// Checkbox Styles
export const checkboxStyles = {
  padding: 0,
  "& .MuiSvgIcon-root": { fontSize: 28 },
  "&:hover": { bgcolor: "transparent", padding: 0 },
  "&.Mui-checked": { color: "#ffa800" },
};

// Input Styles
export const useInputStyles = makeStyles({
  customStyle: {
    "& .MuiOutlinedInput-root": {
      height: 50,
      paddingTop: 3,
      "& input": { height: 15 },
      "& fieldset": { height: 56 },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa800",
        borderWidth: "2px",
      },
    },
  },
});

// Autocomplete Styles
export const useAutocompleteStyles = makeStyles({
  customStyle: {
    "& .MuiOutlinedInput-root": {
      height: 50,
      paddingBottom: 13,
      "& input": { height: 15 },
      "& fieldset": { height: 50 },
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
      "& input": { height: 15 },
      "& fieldset": { height: 66 },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa800",
        borderWidth: "2px",
      },
      "&.MuiIconButton-root": { marginTop: -10 },
    },
  },
});

// Switch Styles
export const CustomSwitch = styled(Switch)(() => ({
  width: 72,
  height: 30,
  padding: 6,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(5px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(36px)",
      "& .MuiSwitch-thumb": {
        backgroundColor: "#FFA800",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#FCDC9D",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#C4C4C4",
    width: 28,
    height: 28,
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
}));