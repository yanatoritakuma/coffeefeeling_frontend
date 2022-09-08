import React, { memo } from "react";
import Button from "@mui/material/Button";

type Props = {
  children: string;
  onClick?: (value?: any) => void;
};

export const ButtonBox = memo((props: Props) => {
  const { children, onClick } = props;

  return (
    <Button variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
});
