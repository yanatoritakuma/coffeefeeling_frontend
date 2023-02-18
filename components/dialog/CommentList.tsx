import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import NoImage from "../../public/noimage.png";
import { css } from "@emotion/react";
import { TextBox } from "../atoms/TextBox";
import { Dialog } from "@mui/material";
import { ButtonBox } from "../atoms/ButtonBox";
import { useMutateComment } from "../../hooks/useMutateComment";
import { useQueryUser } from "../../hooks/useQueryUser";
import { useQueryComment } from "../../hooks/useQueryComment";

type Props = {
  open: boolean;
  onClose: () => void;
  coffeeId: number;
};

const CommentList = memo((props: Props) => {
  const { open, onClose, coffeeId } = props;
  const { data: user } = useQueryUser();

  const { createCommentsMutation } = useMutateComment();

  const { data: commentList, refetch } = useQueryComment(coffeeId);
  console.log("commentList", commentList);

  const [commentState, setCommentState] = useState("");
  const [commentFlag, setCommentFlag] = useState(false);

  useEffect(() => {
    refetch();
  }, [coffeeId]);

  const handleClose = () => {
    onClose();
  };

  const onClickSendComment = (id: number) => {
    if (commentState !== "") {
      createCommentsMutation.mutate({ text: commentState, coffeeId: id });
      setCommentState("");
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <div css={commentBox}>
        <h3>コメント一覧</h3>
        {user !== undefined && (
          <>
            <TextBox
              label="コメント入力"
              value={commentState}
              onChange={(e) => setCommentState(e.target.value)}
              fullWidth
              multiline
              rows={6}
            />
            <ButtonBox onClick={() => onClickSendComment(coffeeId)}>コメントする</ButtonBox>
          </>
        )}
        <div className="commentBox__listBox">
          {commentList?.map((comment) => (
            <div key={comment.id} className="commentBox__list">
              <div className="commentBox__nameBox">
                <div className="commentBox__imgBox">
                  {comment.user?.image !== undefined ? (
                    <Image src={comment.user.image} layout="fill" />
                  ) : (
                    <Image src={NoImage} layout="fill" />
                  )}
                </div>
                <span className="commentBox__name">{comment.user?.name}</span>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
});

export default CommentList;

const commentBox = css`
  margin: 0 auto;
  padding: 20px;
  width: 100%;

  h3 {
    text-align: center;
  }

  .commentBox__listBox {
    margin: 20px 0;
    padding: 0 20px;
    height: 50vh;
    overflow-y: scroll;
  }

  .commentBox__nameBox {
    display: flex;
    align-items: center;
  }

  .commentBox__list {
    margin: 20px 0;
    padding: 20px;
    border: 2px solid #aaa;
    border-radius: 4px;
  }

  .commentBox__name {
    font-size: 18px;
    font-weight: bold;
  }

  .commentBox__imgBox {
    margin-right: 20px;
    position: relative;
    width: 80px;
    height: 80px;

    img {
      border-radius: 50%;
    }
  }

  button {
    margin: 30px auto;
    display: block;
  }
`;
