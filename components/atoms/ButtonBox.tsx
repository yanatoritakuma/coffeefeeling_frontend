import React, { memo } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

type Props = {
  children?: any;
  onClick?: (value?: any) => void;
  upload?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const ButtonBox = memo((props: Props) => {
  const { children, onClick, upload, onChange, disabled } = props;

  return (
    <>
      {!upload ? (
        <Button variant="contained" onClick={onClick} disabled={disabled}>
          {children}
        </Button>
      ) : (
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChange={onChange} />
          <PhotoCamera />
        </IconButton>
      )}
    </>
  );
});
