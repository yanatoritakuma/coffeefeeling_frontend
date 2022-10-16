import React, { memo, useState } from "react";
import { css } from "@emotion/react";
import { Coffee } from "@prisma/client";
import Image from "next/image";
import NoImage from "../../public/noimage.png";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonBox } from "../atoms/ButtonBox";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setEditCoffee, setUpdateFlag } from "../../redux/editCoffeeSlice";
import { deleteImgStorage } from "../../utils/deleteImgStorage";
import { useMutateCoffee } from "../../hooks/useMutateCoffee";
import CoffeeEditDialog from "./CoffeeEditDialog";
import likeFeature from "../../utils/likeFeature";

type Props = {
  coffees: Coffee[] | undefined;
};

const CoffeeDetail = memo((props: Props) => {
  const { coffees } = props;
  const dispatch: AppDispatch = useDispatch();
  const { onClickLike, likeColor, likeCount } = likeFeature();
  const { deleteImg } = deleteImgStorage();
  const { deleteCoffeeMutation } = useMutateCoffee();

  const [editFlag, setEditFlag] = useState(false);

  const loginUserStore = useSelector(
    (state: RootState) => state.loginUser.user
  );

  // 投稿Coffee削除
  const onClickDelete = (coffeeId: number, coffeeImage: string | null) => {
    const ret = window.confirm("削除しますか？");

    if (ret) {
      // 画像が設定してある場合firebaseStorageから画像も削除
      deleteImg(coffeeImage, "coffeeImages");
      deleteCoffeeMutation.mutate(coffeeId);
      dispatch(setUpdateFlag(true));
      alert("削除しました。");
    }
  };

  return (
    <div>
      {coffees?.map((coffee) => (
        <div key={coffee.id} css={productBox}>
          {coffee.image !== null ? (
            <img css={imgCoffee} src={coffee.image} alt="画像" />
          ) : (
            <Image
              src={NoImage}
              css={noImg}
              layout="responsive"
              alt="画像なし"
            />
          )}
          <div css={explanationBox}>
            <span className="explanationBox__text">商品名</span>
            <h4>{coffee.name}</h4>
          </div>
          <div css={explanationBox}>
            <span className="explanationBox__text">カテゴリー</span>
            <h4>{coffee.category}</h4>
          </div>
          <div css={explanationBox}>
            <span className="explanationBox__text">値段</span>
            <h4>{coffee.price}</h4>
          </div>
          <div css={explanationBox}>
            <span className="explanationBox__text">場所</span>
            <h4>{coffee.place}</h4>
          </div>
          <div css={evaluationMainBox}>
            <div css={evaluationBox}>
              <Tooltip title="苦さ" placement="top">
                <FontAwesomeIcon icon={faFaceFrown} className="bitterIcon" />
              </Tooltip>
              {coffee.bitter}
            </div>
            <div css={evaluationBox}>
              <Tooltip title="酸味" placement="top">
                <FontAwesomeIcon
                  icon={faFaceGrinTongue}
                  className="acidityIcon"
                />
              </Tooltip>
              {coffee.acidity}
            </div>
            <div css={evaluationBox}>
              <FontAwesomeIcon
                icon={faHeart}
                className="heartIcon"
                onClick={() => onClickLike(coffee.id)}
                style={
                  likeColor(coffee.id)
                    ? { color: "#e73562" }
                    : { color: "#bcc7d7" }
                }
              />
              {likeCount(coffee.id)?.length}
            </div>
          </div>
          {(() => {
            if (loginUserStore?.admin || coffee.userId === loginUserStore?.id) {
              return (
                <div css={btnBox}>
                  <ButtonBox
                    onClick={() => {
                      setEditFlag(true);
                      dispatch(setEditCoffee(coffee));
                    }}
                  >
                    編集
                  </ButtonBox>
                  <ButtonBox
                    onClick={() => onClickDelete(coffee.id, coffee.image)}
                  >
                    削除
                  </ButtonBox>
                </div>
              );
            }
          })()}
        </div>
      ))}
      <CoffeeEditDialog open={editFlag} onClose={() => setEditFlag(false)} />
    </div>
  );
});

export default CoffeeDetail;

const productBox = css`
  margin: 12px 0;
  padding: 12px;
  border: 2px solid #aaa;
  border-radius: 4px;

  h4 {
    font-size: 18px;
    color: #333;
    overflow: hidden;
    width: 70%;

    @media screen and (max-width: 1024px) {
      font-size: 16px;
    }
  }

  span {
    width: 65px;
  }
`;

const explanationBox = css`
  margin: 12px 0;
  font-size: 18px;
  font-weight: bold;
  h4 {
    margin: 0px;
    padding: 8px 0 0 18px;
  }

  .explanationBox__text {
    color: #7b5544;
    font-size: 16px;
  }
`;

const imgCoffee = css`
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 600px;
`;

const noImg = css`
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 600px;
`;

const evaluationMainBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;
  max-width: 300px;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    width: 32%;
    min-width: 180px;
  }
`;

const evaluationBox = css`
  margin: 12px 0;
  display: flex;
  align-items: center;

  .bitterIcon {
    margin: 0 12px;
    color: #24140e;
    width: 24px;
    height: 24px;

    @media screen and (max-width: 1024px) {
      width: 18px;
      height: 18px;
    }
  }

  .acidityIcon {
    margin: 0 12px;
    color: #9fc24d;
    width: 24px;
    height: 24px;

    @media screen and (max-width: 1024px) {
      width: 18px;
      height: 18px;
    }
  }

  .heartIcon {
    margin: 0 12px;
    color: #e73562;
    width: 24px;
    height: 24px;
    cursor: pointer;

    @media screen and (max-width: 1024px) {
      width: 18px;
      height: 18px;
    }
  }
`;

const btnBox = css`
  margin-top: 20px;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  min-width: 140px;
  max-width: 200px;
`;
