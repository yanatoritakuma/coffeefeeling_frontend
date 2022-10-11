import React from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { useQueryLikes } from "../hooks/useQueryLikes";
import { useQueryCoffees } from "../hooks/useQueryCoffees";
import Image from "next/image";
import NoImage from "../public/noimage.png";
import { Tooltip } from "@mui/material";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import likeFeature from "../utils/likeFeature";

const LikeRanking = () => {
  const { data: likes } = useQueryLikes();
  const { data: coffees } = useQueryCoffees();
  const { onClickLike, likeColor, likeCount } = likeFeature();

  const likesCoffeeId = likes?.map((like) => like.coffeeId);
  const coffeeIdCount: any = {};

  if (likesCoffeeId !== undefined) {
    for (let i = 0; i < likesCoffeeId.length; i++) {
      var elm = likesCoffeeId[i];
      coffeeIdCount[elm] = (coffeeIdCount[elm] || 0) + 1;
    }
  }

  const coffeeIdArray: number[] = Object.values(coffeeIdCount);
  const bestLike = Math.max(...coffeeIdArray);

  const likeCoffeeArray = Object.entries(coffeeIdCount).map(([key, value]) => ({
    [key]: value,
  }));

  const bestLikeCoffeeObj = likeCoffeeArray.filter(
    (coffee) => Object.values(coffee)[0] === bestLike
  );

  const bestLikeCoffee = coffees?.filter(
    (coffee) => coffee.id === Number(Object.keys(bestLikeCoffeeObj[0]))
  );

  console.log(bestLikeCoffee);

  return (
    <div css={likeRankingMainBox}>
      <div css={likeRankingBox}>
        <h2>
          いいねランキング
          <FontAwesomeIcon icon={faCrown} />
        </h2>
        {bestLikeCoffee?.map((coffee) => (
          <div key={coffee.id} css={rankingBox}>
            <span className="rank">1位</span>
            <div className="rankingBox__box">
              <div style={{ width: "48%" }}>
                {coffee.image !== null ? (
                  <Image
                    src={coffee.image}
                    width={300}
                    height={300}
                    alt="画像"
                  />
                ) : (
                  <Image
                    src={NoImage}
                    width={300}
                    height={300}
                    alt="画像なし"
                  />
                )}
              </div>
              <div style={{ width: "48%" }}>
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
                      <FontAwesomeIcon
                        icon={faFaceFrown}
                        className="bitterIcon"
                      />
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikeRanking;

const likeRankingMainBox = css`
  background-color: #f7f6f5;
  width: 100%;
  height: 100vh;
`;

const likeRankingBox = css`
  margin: 0 auto;
  padding: 60px 20px 20px 20px;
  width: 50%;
  min-width: 300px;
  max-width: 1200px;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #fcc800;

    svg {
      margin: 0px 0 6px 12px;
      width: 30px;
    }
  }
`;

const rankingBox = css`
  padding: 20px;
  border: 2px solid #aaa;
  border-radius: 20px;
  overflow-wrap: break-word;

  .rank {
    font-size: 28px;
    font-weight: bold;
    color: #fcc800;
  }

  .rankingBox__box {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
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
