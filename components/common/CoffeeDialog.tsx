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

type Props = {
  open: boolean;
  onClose: () => void;
  bestBitterCoffeeData: Coffee[] | undefined;
  bestAcidityCoffeeData: Coffee[] | undefined;
  bestfeelingData: Coffee[] | undefined;
};

export const CoffeeDialog = (props: Props) => {
  const {
    onClose,
    open,
    bestBitterCoffeeData,
    bestAcidityCoffeeData,
    bestfeelingData,
  } = props;

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
        <div css={contentsBox}>
          {bestfeelingData?.length !== 0 ? (
            <h3 className="best">ベストコーヒー</h3>
          ) : (
            <h3 className="best">ベストコーヒーにはヒットしませんでした。</h3>
          )}
          <CoffeeDetail coffees={bestfeelingData} />
        </div>
        <div css={contentsBox}>
          {bestBitterCoffeeData?.length !== 0 ? (
            <h3 className="bitter">苦味ベストコーヒー</h3>
          ) : (
            <h3 className="bitter">
              苦味ベストコーヒーにはヒットしませんでした。
            </h3>
          )}
          <CoffeeDetail coffees={bestBitterCoffeeData} />
        </div>
        <div css={contentsBox}>
          {bestAcidityCoffeeData?.length !== 0 ? (
            <h3 className="acidity">酸味ベストコーヒー</h3>
          ) : (
            <h3 className="acidity">
              酸味ベストコーヒーはヒットしませんでした。
            </h3>
          )}
          <CoffeeDetail coffees={bestAcidityCoffeeData} />
        </div>
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
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    display: block;
  }

  h3 {
    text-align: center;
    font-size: 24px;

    @media screen and (max-width: 1024px) {
      font-size: 20px;
    }
  }

  .best {
    color: #ea5550;
  }

  .bitter {
    color: #24140e;
  }

  .acidity {
    color: #9fc24d;
  }
`;

const contentsBox = css`
  margin: 0 auto;
  padding: 14px;
  width: 30%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 4px 4px 2px #dddcd6;
  overflow-wrap: break-word;

  @media screen and (max-width: 1024px) {
    margin: 30px auto;
    width: 100%;
  }
`;
