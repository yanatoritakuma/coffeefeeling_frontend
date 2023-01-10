import React, { memo, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import NoImage from "../../public/noimage.png";
import UserImg from "../../public/user.png";

type Props = {
  selectImgEnlargement: string;
  setSelectImgEnlargement: React.Dispatch<React.SetStateAction<string>>;
};

const ImageEnlargement = memo((props: Props) => {
  const { selectImgEnlargement, setSelectImgEnlargement } = props;

  const selectImgRef = useRef<any>();

  useEffect(() => {
    document.addEventListener("mousedown", selectImgOutside);
    return () => document.removeEventListener("mousedown", selectImgOutside);
  }, []);

  const selectImgOutside = (e: any) => {
    if (selectImgRef.current?.contains(e.target)) {
      setSelectImgEnlargement("");
    }
  };

  return (
    <div css={imageEnlargementBox} ref={selectImgRef}>
      <div className="imageEnlargementBox__fileter"></div>

      {(() => {
        switch (selectImgEnlargement) {
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
          default:
            return (
              <div className="imageEnlargementBox__imgBox">
                <Image
                  src={selectImgEnlargement}
                  layout="fill"
                  objectFit="contain"
                  alt="選択された画像"
                />
              </div>
            );
        }
      })()}
    </div>
  );
});

export default ImageEnlargement;

const imageEnlargementBox = css`
  .imageEnlargementBox__fileter {
    background-color: #333;
    opacity: 0.7;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
