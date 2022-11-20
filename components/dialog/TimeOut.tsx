import React, { memo, useState } from "react";
import { css } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonBox } from "../atoms/ButtonBox";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
};

const TimeOut = memo((props: Props) => {
  const { open } = props;
  const router = useRouter();

  const onClickReload = () => {
    router.push("/").then(() => location.reload());
  };

  return (
    <Dialog open={open} maxWidth="xl" css={timeOutBox}>
      <DialogTitle>アクセスに時間がかかっています</DialogTitle>
      <p>
        アクセスに時間がかかっております。
        <br />
        申し訳ありませんが「再読み込みボタン」で再読み込みをしてやり直してください。
      </p>
      <ButtonBox onClick={() => onClickReload()}>再読み込み</ButtonBox>
    </Dialog>
  );
});

export default TimeOut;

const timeOutBox = css`
  .MuiPaper-root {
    padding: 20px;

    @media screen and (max-width: 425px) {
      padding: 12px;
    }
  }

  h2 {
    text-align: center;
  }

  p {
    text-align: center;
    line-height: 1.5em;
  }

  button {
    margin: 12px auto;
    width: 50%;
  }
`;
