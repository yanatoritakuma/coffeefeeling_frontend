import React, { memo, useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "../atoms/TextBox";

const CommentList = memo(() => {
  const [commentState, setCommentState] = useState("");
  return (
    <div css={commentInputBox}>
      CommentInput
      <TextBox
        label="コメント入力"
        value={commentState}
        onChange={(e) => setCommentState(e.target.value)}
      />
    </div>
  );
});

export default CommentList;

const commentInputBox = css`
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  width: 80%;
`;
