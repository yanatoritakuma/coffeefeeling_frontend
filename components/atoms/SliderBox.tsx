import React, { memo } from "react";
import Slider from "@mui/material/Slider";

type Props = {
  value: number;
  onChange: (value: any) => void;
  max: number;
  min: number;
};

export const SliderBox = memo((props: Props) => {
  const { value, onChange, max, min } = props;
  return (
    <>
      <Slider
        value={value}
        onChange={onChange}
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
        max={max}
        min={min}
      />
    </>
  );
});
