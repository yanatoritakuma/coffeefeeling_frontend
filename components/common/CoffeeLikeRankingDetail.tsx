import React, { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import UserImg from "../../public/user.png";
import NoImage from "../../public/noimage.png";
import likeFeature from "../../utils/likeFeature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Tooltip } from "@mui/material";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { TCoffeeUser, TUserId } from "../../types/coffee";
import ImageEnlargement from "./ImageEnlargement";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setLikeId } from "../../redux/clickLikeSlice";

type Props = {
  coffeeLikes: TCoffeeUser[] | undefined;
  rankName: string;
  setTransmission: React.Dispatch<React.SetStateAction<boolean>>;
};

const CoffeeLikeRankingDetail = memo((props: Props) => {
  const { coffeeLikes, rankName, setTransmission } = props;
  const dispatch: AppDispatch = useDispatch();
  const { onClickLike, likeColor } = likeFeature();
  const clickLikeStore = useSelector((state: RootState) => state.clickLike.coffeeId);
  const loginUserStore = useSelector((state: RootState) => state.loginUser.user);

  const likeUserIds = (userIds: TUserId[]) => {
    const likesId = userIds.map((user) => {
      return user.userId;
    });

    return likesId;
  };

  // 拡大したいコーヒー
  const [selectImgEnlargement, setSelectImgEnlargement] = useState("");

  return (
    <div>
      {coffeeLikes !== undefined && (
        <div>
          <span css={rankText}>
            {coffeeLikes.length === 0
              ? `現在${rankName}はありません。`
              : coffeeLikes?.length <= 1
              ? rankName
              : rankName + "タイ"}
          </span>

          {coffeeLikes?.map((coffee) => (
            <div key={coffee.id} css={rankingBox}>
              <div className="rankingBox__userBox">
                {coffee.user?.image !== null ? (
                  <Image
                    src={coffee.user?.image}
                    width={80}
                    height={80}
                    alt="ユーザーアイコン"
                    onClick={() => setSelectImgEnlargement(String(coffee.user?.image))}
                  />
                ) : (
                  <Image
                    src={UserImg}
                    width={80}
                    height={80}
                    alt="ユーザーアイコン"
                    onClick={() => setSelectImgEnlargement("noUserImg")}
                  />
                )}
                <h5>{coffee.user.name}</h5>
              </div>

              <div className="rankingBox__box">
                <div className="rankingBox__boxIn">
                  {coffee.image !== null ? (
                    <div css={imgBox} onClick={() => setSelectImgEnlargement(String(coffee.image))}>
                      <Image
                        src={coffee.image}
                        width={140}
                        height={100}
                        layout="responsive"
                        alt="イメージ画像"
                      />
                    </div>
                  ) : (
                    <div css={imgBox} onClick={() => setSelectImgEnlargement("noCoffeeImg")}>
                      <Image
                        src={NoImage}
                        width={140}
                        height={100}
                        layout="responsive"
                        alt="画像なし"
                      />
                    </div>
                  )}
                </div>
                <div className="rankingBox__boxIn">
                  <div css={explanationBox}>
                    <span className="explanationBox__text">商品名</span>
                    <h3>{coffee.name}</h3>
                  </div>
                  <div css={explanationBox}>
                    <span className="explanationBox__text">カテゴリー</span>
                    <h3>{coffee.category}</h3>
                  </div>
                  <div css={explanationBox}>
                    <span className="explanationBox__text">値段</span>
                    <h3>{coffee.price}</h3>
                  </div>
                  <div css={explanationBox}>
                    <span className="explanationBox__text">場所</span>
                    <h3>{coffee.place}</h3>
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
                        <FontAwesomeIcon icon={faFaceGrinTongue} className="acidityIcon" />
                      </Tooltip>
                      {coffee.acidity}
                    </div>
                    {clickLikeStore !== coffee.id ? (
                      <div css={evaluationBox}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="heartIcon"
                          onClick={() => {
                            onClickLike(likeUserIds(coffee.likes), coffee.id);
                            if (loginUserStore !== undefined) {
                              dispatch(setLikeId(coffee.id));
                            }
                            setTransmission(true);
                          }}
                          style={
                            likeColor(likeUserIds(coffee.likes))
                              ? { color: "#e73562" }
                              : { color: "#bcc7d7" }
                          }
                        />
                        {coffee.likes.length}
                      </div>
                    ) : (
                      <div css={circularProgressBox}>
                        <CircularProgress size="2rem" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ImageEnlargement
        open={selectImgEnlargement !== "" ? true : false}
        onClose={() => setSelectImgEnlargement("")}
        selectImg={selectImgEnlargement}
      />
    </div>
  );
});

export default CoffeeLikeRankingDetail;

const rankText = css`
  font-size: 28px;
  font-weight: bold;
  color: #fcc800;
`;

const rankingBox = css`
  margin: 20px 0;
  padding: 20px;
  border: 2px solid #aaa;
  border-radius: 20px;
  overflow-wrap: break-word;
  background-color: #fff;

  .rankingBox__box {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      display: block;
    }
  }

  .rankingBox__boxIn {
    width: 48%;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .rankingBox__userBox {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
    }

    h5 {
      margin-left: 12px;
      font-size: 16px;
    }
  }
`;

const explanationBox = css`
  margin: 12px 0;
  font-size: 18px;
  font-weight: bold;

  h3 {
    margin: 0px;
    padding: 8px 0 0 18px;
  }

  .explanationBox__text {
    color: #7b5544;
    font-size: 16px;
  }
`;

const evaluationMainBox = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

const evaluationBox = css`
  margin: 12px 0;
  display: flex;
  align-items: center;
  width: 30%;

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

const circularProgressBox = css`
  width: 33%;
  text-align: center;
`;

const imgBox = css`
  text-align: center;

  img {
    object-fit: contain;
  }
`;
