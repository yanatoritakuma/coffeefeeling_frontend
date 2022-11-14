import React, { memo, useEffect } from "react";
import { css } from "@emotion/react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { CoffeeForm } from "./CoffeeForm";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateFlag } from "../../redux/editCoffeeSlice";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CoffeeEditDialog = memo((props: Props) => {
  const { open, onClose } = props;
  const dispatch: AppDispatch = useDispatch();

  const editCoffeeUpdateFlag = useSelector(
    (state: RootState) => state.editCoffee.updateFlag
  );

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    handleClose();
    dispatch(setUpdateFlag(false));
  }, [editCoffeeUpdateFlag]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" css={dialogBox}>
      <DialogTitle>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="closeBtn"
          onClick={handleClose}
        />
      </DialogTitle>
      <CoffeeForm fromWidth="100%" editType />
    </Dialog>
  );
});

export default CoffeeEditDialog;

const dialogBox = css`
  .MuiPaper-root {
    padding: 20px;
    width: 60%;
    height: 100vh;
    min-width: 290px;
    background-color: #eae5e3;

    @media screen and (max-width: 425px) {
      padding: 12px;
    }
  }

  .closeBtn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 38px;
    height: 38px;
    color: #333;
    cursor: pointer;

    @media screen and (max-width: 425px) {
      width: 28px;
      height: 28px;
    }
  }
`;
