import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useQueryFeelingCoffees } from "../../hooks/useQueryFeelingCoffees";
import { AppDispatch, RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from "@fortawesome/free-solid-svg-icons";
import FeelingCoffeeDetail from "../../components/common/FeelingCoffeeDetail";
import { CircularProgress } from "@mui/material";
import TimeOut from "../../components/dialog/TimeOut";
import { setLikeId } from "../../redux/clickLikeSlice";

const feelNow = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const editCoffeeUpdateFlag = useSelector((state: RootState) => state.editCoffee.updateFlag);

  const feelingReq = {
    category: String(router.query.category),
    bitter: Number(router.query.bitter),
    acidity: Number(router.query.acidity),
    price: Number(router.query.price),
    place: String(router.query.place),
  };

  const { status, data, refetch } = useQueryFeelingCoffees(feelingReq);

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

  // タイムアウトしたらタイムアウトダイアログ表示
  useEffect(() => {
    if (timeOut && status === "loading") {
      setTimeOutDailog(true);
    }
  }, [timeOut]);

  const refetchSetTime = () => {
    refetch();
    dispatch(setLikeId(null));
  };

  // 編集後にAPI再取得
  useEffect(() => {
    if (editCoffeeUpdateFlag) {
      setTimeout(refetchSetTime, 2000);
    }
  }, [editCoffeeUpdateFlag]);

  useEffect(() => {
    setTimeout(refetchSetTime, 1000);
    setTransmission(false);
  }, [transmission]);

  return (
    <section css={feelNowBox}>
      {data?.bitterBest?.length !== 0 || data?.acidityBest?.length !== 0 ? (
        <>
          <h2>今の気分</h2>
          <div css={feelNowListBox}>
            <span className="feelNowListBox__labelBox">
              <span className="feelNowListBox__label">カテゴリー</span>：
              <span className="feelNowListBox__text">{router.query.category}</span>
            </span>
            <span className="feelNowListBox__labelBox">
              <span className="feelNowListBox__label">
                苦味
                <FontAwesomeIcon icon={faFaceFrown} className="bitterIcon" />
              </span>
              ：<span className="feelNowListBox__text">{router.query.bitter}</span>
            </span>
            <span className="feelNowListBox__labelBox">
              <span className="feelNowListBox__label">
                酸味
                <FontAwesomeIcon icon={faFaceGrinTongue} className="acidityIcon" />
              </span>
              ：<span className="feelNowListBox__text">{router.query.acidity}</span>
            </span>
            <span className="feelNowListBox__labelBox">
              <span className="feelNowListBox__label">値段</span>：
              <span className="feelNowListBox__text">{router.query.price}</span>
            </span>
            <span className="feelNowListBox__labelBox">
              <span className="feelNowListBox__label">場所</span>：
              <span className="feelNowListBox__text">{router.query.place}</span>
            </span>
          </div>
          <FeelingCoffeeDetail bestCoffee={data} setTransmission={setTransmission} />
        </>
      ) : (
        <h2>現在表示できるコーヒーがありません。</h2>
      )}
      {loadingFlag && (
        <div className="fileter">
          <CircularProgress size="6rem" />
        </div>
      )}
      <TimeOut open={timeOutDailog} />
    </section>
  );
};

export default feelNow;

const feelNowBox = css`
  padding: 20px 0;
  background-color: #d3cbc6;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  h2 {
    margin-top: 120px;
    color: #7b5544;
    text-align: center;
    font-size: 28px;
  }

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

const feelNowListBox = css`
  margin: 0 auto;
  width: fit-content;

  .feelNowListBox__labelBox {
    margin: 20px 0;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .feelNowListBox__text {
    margin-left: 12px;
    font-weight: bold;
    width: 150px;
  }

  .feelNowListBox__label {
    display: block;
    width: 106px;
  }

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
`;
