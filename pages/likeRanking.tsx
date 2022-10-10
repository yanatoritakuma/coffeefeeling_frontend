import React from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { useQueryLikes } from "../hooks/useQueryLikes";
import { useQueryCoffees } from "../hooks/useQueryCoffees";

const LikeRanking = () => {
  const { data: likes } = useQueryLikes();
  const { data: coffees } = useQueryCoffees();

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
        <div>{bestLikeCoffee?.map((v) => v.name)}</div>
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
