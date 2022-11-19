import React, { memo, useState } from "react";
import { css } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "../atoms/CheckBox";
import { ButtonBox } from "../atoms/ButtonBox";
import { useMutateUser } from "../../hooks/useMutateUser";
import { useQueryUser } from "../../hooks/useQueryUser";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AccountDelete = memo((props: Props) => {
  const { open, onClose } = props;
  const { data: user } = useQueryUser();

  const handleClose = () => {
    onClose();
  };

  const [deleteCheck, setDeleteCheck] = useState(false);

  const { deleteUserMutation } = useMutateUser();

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" css={dialogBox}>
      <DialogTitle>
        アカウント削除
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="closeBtn"
          onClick={handleClose}
        />
      </DialogTitle>
      <p>
        アカウントを削除すると復元することはできません。
        <br />
        削除する場合は、チェックボックスにチェックしてください。
      </p>
      <CheckBox
        label="削除確認"
        check={deleteCheck}
        onChange={(e: any) => setDeleteCheck(e.target.checked)}
      />
      <div css={btnBox}>
        <ButtonBox
          onClick={() =>
            user &&
            deleteUserMutation.mutate({
              id: user.id,
              image: user.image,
            })
          }
          disabled={!deleteCheck}
        >
          削除
        </ButtonBox>
      </div>
    </Dialog>
  );
});

export default AccountDelete;

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
    color: #e73562;
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

const btnBox = css`
  margin: 20px auto;
  width: 60%;

  button {
    display: block;
    width: 100%;
  }
`;
