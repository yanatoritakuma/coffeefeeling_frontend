import React, { memo, useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "../atoms/TextBox";
import { Dialog, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CommentList = memo((props: Props) => {
  const { open, onClose } = props;

  const [commentState, setCommentState] = useState("");

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <div css={commentInputBox}>
        <DialogTitle>CommentInput</DialogTitle>
        <TextBox
          label="コメント入力"
          value={commentState}
          onChange={(e) => setCommentState(e.target.value)}
        />
      </div>
    </Dialog>
  );
});

export default CommentList;

const commentInputBox = css`
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  width: 80%;
`;
