import React, { useState } from "react";
import { Checkbox } from "@mui/material";
const ControlledCheckbox = ({ id, value, onChange }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      sx={{
        "&": { padding: 0 },
        "& .MuiSvgIcon-root": { fontSize: 28 },

        "&:hover": { bgcolor: "transparent", padding: 0 },
        "&.Mui-checked": {
          color: "#ffa800",
        },
      }}
      id={id}
      checked={id ? value === id : checked}
      onChange={(event) => (id ? onChange(event, value) : handleChange(event))}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default ControlledCheckbox;