import React, { memo } from "react";
import { css } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CanNotLogin = memo((props: Props) => {
  const { open, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" css={dialogBox}>
      <DialogTitle>
        ログインできない場合
        <FontAwesomeIcon icon={faCircleXmark} className="closeBtn" onClick={handleClose} />
      </DialogTitle>
      <p>
        このアプリはCookieを使用しております。
        <br />
        お使いの端末がCookieを無効に設定している場合は
        <br />
        Cookieを有効にしてから再度ログインしてください。
      </p>
    </Dialog>
  );
});

export default CanNotLogin;

const dialogBox = css`
  .MuiPaper-root {
    padding: 20px;
    width: 100%;
    max-width: 800px;
    min-width: 290px;
    background-color: #fff;

    @media screen and (max-width: 425px) {
      padding: 12px;
    }
  }

  h2 {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1024px) {
      font-size: 24px;
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

  p {
    text-align: center;
    line-height: 1.5em;
    color: #e73562;
  }
`;
