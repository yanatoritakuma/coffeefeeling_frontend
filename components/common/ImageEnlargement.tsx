import React, { memo } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import NoImage from "../../public/noimage.png";
import UserImg from "../../public/user.png";
import { Dialog } from "@mui/material";

type Props = {
  selectImg: string;
  open: boolean;
  onClose: () => void;
};

const ImageEnlargement = memo((props: Props) => {
  const { selectImg, open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} css={imageEnlargementBox}>
      {(() => {
        switch (selectImg) {
          case "noUserImg":
            return (
              <div className="imageEnlargementBox__imgBox">
                <Image src={UserImg} layout="fill" objectFit="contain" alt="選択された画像" />
              </div>
            );
          case "noCoffeeImg":
            return (
              <div className="imageEnlargementBox__imgBox">
                <Image src={NoImage} layout="fill" objectFit="contain" alt="選択された画像" />
              </div>
            );
          case "":
            return;
          default:
            return (
              <div className="imageEnlargementBox__imgBox">
                <Image src={selectImg} layout="fill" objectFit="contain" alt="選択された画像" />
              </div>
            );
        }
      })()}
    </Dialog>
  );
});

export default ImageEnlargement;

const imageEnlargementBox = css`
  .imageEnlargementBox__imgBox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    z-index: 501;
    width: 500px;
    height: 500px;

    @media screen and (max-width: 425px) {
      width: 300px;
      height: 300px;
    }
  }
`;
