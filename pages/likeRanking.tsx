import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { useQueryCoffees } from "../hooks/useQueryCoffees";
import CoffeeLikeRankingDetail from "../components/common/CoffeeLikeRankingDetail";
import { CircularProgress } from "@mui/material";
import TimeOut from "../components/dialog/TimeOut";
import { useQueryLikeRankingCoffees } from "../hooks/useQueryLikeRankingCoffees";
import likeFeature from "../utils/likeFeature";

const LikeRanking = () => {
  const { status, data: likeRankingCoffees } = useQueryLikeRankingCoffees();
  const { getCoffeeId } = likeFeature();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [timeOut, setTimeOut] = useState(false);
  const [timeOutDailog, setTimeOutDailog] = useState(false);

  // APIタイムアウト処理
  useEffect(() => {
    if (status === "success") {
      setLoadingFlag(false);
      setTimeOut(false);
    } else if (status === "loading") {
      setTimeout(() => {
        setTimeOut(true);
      }, 20000);
    }
  }, [status]);

  useEffect(() => {
    if (timeOut && status === "loading") {
      setTimeOutDailog(true);
    }
  }, [timeOut]);

  const coffeeLikeBest = likeRankingCoffees?.filter(
    (coffee) => coffee._count.likes === likeRankingCoffees[0]._count.likes
  );

  const bestCoffeeExcept = likeRankingCoffees?.filter(
    (coffee, index) =>
      coffee.id !== (coffeeLikeBest !== undefined && coffeeLikeBest[index]?.id)
  );

  const secondCoffee = bestCoffeeExcept?.filter(
    (coffee) => coffee._count.likes === bestCoffeeExcept[0]._count.likes
  );

  const coffeeLikeBestArray =
    coffeeLikeBest !== undefined ? coffeeLikeBest : [];

  const secondCoffeeArray = secondCoffee !== undefined ? secondCoffee : [];

  const bestAndSecond = [...coffeeLikeBestArray, ...secondCoffeeArray];

  const bestAndSecondCoffeeExcept = likeRankingCoffees?.filter(
    (coffee, index) => coffee !== bestAndSecond[index]
  );

  const thirdCoffee = bestAndSecondCoffeeExcept?.filter(
    (coffee) =>
      coffee._count.likes === bestAndSecondCoffeeExcept[0]._count.likes
  );

  const coffeeIds =
    likeRankingCoffees !== undefined
      ? likeRankingCoffees?.map((coffee) => {
          return coffee.id;
        })
      : [0];

  useEffect(() => {
    getCoffeeId(coffeeIds);
  }, [likeRankingCoffees]);

  return (
    <div css={likeRankingMainBox}>
      <div css={likeRankingBox}>
        <h2>
          いいねランキング
          <FontAwesomeIcon icon={faCrown} />
        </h2>
        <CoffeeLikeRankingDetail coffeeLikes={coffeeLikeBest} rankName="1位" />
        <CoffeeLikeRankingDetail coffeeLikes={secondCoffee} rankName="2位" />
        <CoffeeLikeRankingDetail coffeeLikes={thirdCoffee} rankName="3位" />
      </div>
      {loadingFlag && (
        <div className="fileter">
          <CircularProgress size="6rem" />
        </div>
      )}
      <TimeOut open={timeOutDailog} />
    </div>
  );
};

export default LikeRanking;

const likeRankingMainBox = css`
  background-color: #f7f6f5;
  width: 100%;
  height: auto;
  min-height: 100vh;

  .fileter {
    background-color: #333;
    opacity: 0.7;
    position: fixed;
    top: 0;
    z-index: 500;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const likeRankingBox = css`
  margin: 0 auto;
  padding: 60px 20px 20px 20px;
  width: 50%;
  min-width: 300px;
  max-width: 1200px;

  @media screen and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }

  @media screen and (max-width: 425px) {
    width: 96%;
  }

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
