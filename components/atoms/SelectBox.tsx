import React, { memo } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  value: string;
  onChange: (value: any) => void;
  label: string;
  menuItems: string[];
};

export const SelectBox = memo((props: Props) => {
  const { value, onChange, label, menuItems } = props;

  return (
    <>
      <InputLabel style={{ color: "#333" }}>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e)}
        style={{ backgroundColor: "#fff", width: "100%" }}
      >
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} value={menuItem}>
            {menuItem}
          </MenuItem>
        ))}
      </Select>
    </>
  );
});
