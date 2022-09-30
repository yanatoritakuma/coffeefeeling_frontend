import React, { useState, memo } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  menuItemArray: string[];
  setSelectMenu: React.Dispatch<React.SetStateAction<number>>;
};

export const MenuBox = memo((props: Props) => {
  const { anchorEl, setAnchorEl, menuItemArray, setSelectMenu } = props;
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItemArray.map((item, index) => (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setSelectMenu(index);
            }}
            key={index}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});
