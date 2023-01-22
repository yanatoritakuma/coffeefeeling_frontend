import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import CoffeeLikeRankingDetail from "../components/common/CoffeeLikeRankingDetail";
import { CircularProgress } from "@mui/material";
import TimeOut from "../components/dialog/TimeOut";
import { useQueryLikeRankingCoffees } from "../hooks/useQueryLikeRankingCoffees";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { setLikeId } from "../redux/clickLikeSlice";

const LikeRanking = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, data, refetch } = useQueryLikeRankingCoffees();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [timeOut, setTimeOut] = useState(false);
  const [timeOutDailog, setTimeOutDailog] = useState(false);
  const [transmission, setTransmission] = useState(false);

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

  // 1位のコーヒー
  const coffeeLikeBest = data?.filter((coffee) => {
    return coffee.likes.length === data[0]?.likes.length;
  });

  // 1位を除くTOP10のコーヒー
  const bestCoffeeExcept = data?.filter((coffee) => {
    return coffee.likes.length !== data[0]?.likes.length;
  });

  // 2位のコーヒー
  const secondCoffee = data?.filter((coffee) => {
    if (bestCoffeeExcept !== undefined) {
      return coffee.likes.length === bestCoffeeExcept[0]?.likes.length;
    }
  });

  // 3位タイのコーヒー
  const thirdCoffeeTie = bestCoffeeExcept?.filter((coffee) => {
    if (secondCoffee !== undefined) {
      return coffee.likes.length !== secondCoffee[0]?.likes.length;
    }
  });

  // 3位のコーヒー
  const thirdCoffee = thirdCoffeeTie?.filter((coffee) => {
    return coffee.likes.length === thirdCoffeeTie[0].likes.length;
  });

  const refetchSetTime = () => {
    refetch();
    dispatch(setLikeId(null));
  };

  useEffect(() => {
    setTimeout(refetchSetTime, 1000);
    setTransmission(false);
  }, [transmission]);

  return (
    <div css={likeRankingMainBox}>
      <div css={likeRankingBox}>
        <h2>LikeRanking</h2>
        <h3 className="likeRankingBox__h3">
          いいねランキング TOP10
          <FontAwesomeIcon icon={faCrown} />
        </h3>
        <CoffeeLikeRankingDetail
          coffeeLikes={coffeeLikeBest}
          rankName="1位"
          setTransmission={setTransmission}
        />
        <CoffeeLikeRankingDetail
          coffeeLikes={secondCoffee}
          rankName="2位"
          setTransmission={setTransmission}
        />
        <CoffeeLikeRankingDetail
          coffeeLikes={thirdCoffee}
          rankName="3位"
          setTransmission={setTransmission}
        />
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
  background-color: #c1bebd;
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
    margin-top: 120px;
    font-size: 60px;
    font-family: "Kalam", cursive;
    color: #fcc800;
    text-align: center;

    @media screen and (max-width: 425px) {
      font-size: 46px;
    }
  }

  .likeRankingBox__h3 {
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
