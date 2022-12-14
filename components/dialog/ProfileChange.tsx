import React, { memo, useState, useEffect } from "react";
import { css } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { TextBox } from "../atoms/TextBox";
import { ButtonBox } from "../atoms/ButtonBox";
import Image from "next/image";
import firebase, { storage } from "../../firebase/initFirebase";
import { useMutateUser } from "../../hooks/useMutateUser";
import { deleteImgStorage } from "../../utils/deleteImgStorage";
import { useQueryUser } from "../../hooks/useQueryUser";
import UserImg from "../../public/user.png";
import useChangeImage from "../../hooks/useChangeImage";
import imageRegistration from "../../utils/imageRegistration";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ProfileChange = memo((props: Props) => {
  const { open, onClose } = props;

  const { updateUserMutation } = useMutateUser();
  const { data: user } = useQueryUser();

  const { deleteImg } = deleteImgStorage();

  const [profile, setProfile] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    if (user !== undefined && user.name !== null) {
      setProfile({
        ...profile,
        name: user.name,
      });
    }
  }, [user]);

  // アップロード画像hooks
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();

  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (user !== undefined && user.image !== null) {
      setPreviewUrl(user?.image);
    }
  }, [user]);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!photoUrl) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const res = reader!.result;
      if (res && typeof res === "string") {
        setPreviewUrl(res);
      }
    };
    reader.readAsDataURL(photoUrl);

    return () => {
      reader = null;
    };
  }, [photoUrl]);

  // db登録処理
  const dbRegistration = (file: any) => {
    if (file === null) {
      // 画像が変更されていない場合の更新処理
      updateUserMutation.mutate({
        name: profile.name,
      });
    } else {
      // 画像が変更されている場合の更新処理
      updateUserMutation.mutate({
        name: profile.name,
        image: file,
      });
      // 既に登録済みの画像を削除
      user?.image !== undefined && deleteImg(user.image, "userImages");
    }

    setProfile({
      name: "",
      image: null,
    });
  };

  const { onClickRegistration } = imageRegistration();

  // 変更処理
  const onClickChange = (e: React.FormEvent<HTMLFormElement>) => {
    const ret = window.confirm("この内容で登録しますか？");

    // バリデーション
    if (profile.name === "") {
      return alert("名前は必須です。");
    }

    if (ret) {
      onClickRegistration(
        e,
        photoUrl,
        dbRegistration,
        setPhotoUrl,
        setPreviewUrl
      );

      handleClose();
      alert("変更しました。");
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" css={dialogBox}>
      <DialogTitle>
        プロフィール変更
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="closeBtn"
          onClick={handleClose}
        />
      </DialogTitle>
      <TextBox
        value={profile.name}
        onChange={(e) =>
          setProfile({
            ...profile,
            name: e.target.value,
          })
        }
        label="名前"
        fullWidth
      />
      <div css={uploadBox}>
        <ButtonBox upload onChange={onChangeImageHandler} />
      </div>
      {previewUrl ? (
        <div css={imageBox}>
          <Image
            src={previewUrl}
            alt="画像"
            layout="responsive"
            width={400}
            height={340}
          />
        </div>
      ) : (
        <div css={imageBox}>
          <Image
            src={UserImg}
            alt="画像"
            layout="responsive"
            width={400}
            height={340}
          />
        </div>
      )}
      <div css={btnBox}>
        <ButtonBox onClick={(e) => onClickChange(e)}>変更</ButtonBox>
      </div>
    </Dialog>
  );
});

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
    color: #7b5544;
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
`;

const imageBox = css`
  margin: 0 auto;
  width: 50%;

  img {
    border-radius: 50%;
  }
`;

const uploadBox = css`
  margin: 20px 0;
  svg {
    font-size: 36px;
  }
`;

const btnBox = css`
  margin: 20px 0;
  text-align: center;

  button {
    width: 60%;
  }
`;
