import React, { memo } from "react";
import { css } from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  value: string;
  onChange: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined;
  label: string;
  menuItems: string[];
};

export const SelectBox = memo((props: Props) => {
  const { value, onChange, label, menuItems } = props;

  return (
    <>
      <FormControl fullWidth css={selectBox}>
        <InputLabel style={{ color: "#333" }}>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={onChange}
          style={{ backgroundColor: "#fff", width: "100%" }}
        >
          {menuItems.map((menuItem, index) => (
            <MenuItem key={index} value={menuItem}>
              {menuItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
});

const selectBox = css`
  div {
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", sans-serif !important;
  }
`;
