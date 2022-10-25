import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Coffee } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import CoffeeEditDialog from "./CoffeeEditDialog";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateFlag } from "../../redux/editCoffeeSlice";
import CoffeeDetail from "./CoffeeDetail";
import { useQueryFeelingCoffees } from "../../hooks/useQueryFeelingCoffees";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CoffeeDialog = (props: Props) => {
  const { onClose, open } = props;
  const { status, data, error } = useQueryFeelingCoffees();
  console.log("CoffeeDetail", data);

  const dispatch: AppDispatch = useDispatch();

  const editCoffeeStore = useSelector(
    (state: RootState) => state.editCoffee.updateFlag
  );

  const [editFlag, setEditFlag] = useState(false);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    handleClose();
    if (editCoffeeStore) {
      dispatch(setUpdateFlag(false));
    }
  }, [editCoffeeStore]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" css={dialogBox}>
      <DialogTitle>
        今の気分は
        <FontAwesomeIcon className="coffeeIcon" icon={faMugSaucer} />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="closeBtn"
          onClick={handleClose}
        />
      </DialogTitle>
      <div css={bestBox}>
        <CoffeeDetail coffees={data} />
      </div>
      <CoffeeEditDialog open={editFlag} onClose={() => setEditFlag(false)} />
    </Dialog>
  );
};

const dialogBox = css`
  .MuiPaper-root {
    padding: 20px;
    width: 100%;
    min-width: 290px;
    background-color: #eae5e3;

    @media screen and (max-width: 425px) {
      padding: 12px;
    }
  }

  h2 {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #7b5544;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1024px) {
      font-size: 24px;
    }

    .coffeeIcon {
      margin-left: 6px;
      color: #7b5544;
      width: 38px;
      height: 38px;

      @media screen and (max-width: 768px) {
        width: 28px;
        height: 28px;
      }
    }

    .closeBtn {
      position: absolute;
      top: 0;
      right: 0;
      width: 38px;
      height: 38px;
      color: #333;
      cursor: pointer;

      @media screen and (max-width: 425px) {
        width: 28px;
        height: 28px;
      }
    }
  }
`;

const bestBox = css`
  overflow-y: scroll;

  h3 {
    text-align: center;
    font-size: 24px;

    @media screen and (max-width: 1024px) {
      font-size: 20px;
    }
  }
`;
