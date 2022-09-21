import React, { useState, memo } from "react";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: boolean;
};

export const TextBox = memo((props: Props) => {
  const { value, onChange, label, type } = props;

  const [values, setValues] = useState<any>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [displayPs, setDisplayPs] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div css={textBox}>
      {!type ? (
        <TextField
          value={value}
          onChange={onChange}
          label={label}
          variant="outlined"
        />
      ) : (
        <FormControl variant="outlined">
          <InputLabel>{label}</InputLabel>
          <OutlinedInput
            type={displayPs ? "text" : "password"}
            value={value}
            onChange={onChange}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setDisplayPs(!displayPs)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    </div>
  );
});

const textBox = css`
  input {
    background-color: #fff;
  }
`;
