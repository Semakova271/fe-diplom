

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(() => ({
  width: 72,
  height: 30,
  padding: 6,
  /** */
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
    
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20 / 2,
  },
}));

export default CustomSwitch;