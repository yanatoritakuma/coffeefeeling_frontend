import React, { memo, useEffect, useState } from "react";
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
import { TBestCoffee } from "../../hooks/useQueryFeelingCoffees";

type Props = {
  bestCoffee: TBestCoffee | undefined;
};

const FeelingCoffeeDetail = memo((props: Props) => {
  const { bestCoffee } = props;
  const dispatch: AppDispatch = useDispatch();
  const { onClickLike, likeColor, likeCount } = likeFeature();
  const { deleteImg } = deleteImgStorage();
  const { deleteCoffeeMutation } = useMutateCoffee();

  const [editFlag, setEditFlag] = useState(false);
  const [switchCoffeeFlag, setSwitchCoffeeFlag] = useState("bestCoffee");
  const [bestAllCoffee, setBestAllCoffee] = useState<Coffee[] | undefined>();

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

  // 苦味と酸味どちらにも当てはまるコーヒー
  useEffect(() => {
    if (bestCoffee !== undefined) {
      const bitterIds = bestCoffee.bitterBest.map((coffee) => {
        return coffee.id;
      });

      const acidityIds = bestCoffee.acidityBest.map((coffee) => {
        return coffee.id;
      });

      const bitterAcidityIds = [...bitterIds, ...acidityIds];

      const bestAllCoffeeIdSelect = bitterAcidityIds.filter(
        (id) => bitterIds.includes(id) && acidityIds.includes(id)
      );

      const bestAllCoffeeIds = new Set(bestAllCoffeeIdSelect);
      const bestAllCoffeeIdArray = [...bestAllCoffeeIds];

      const bestAllCoffeeSelect = bestCoffee.bitterBest.filter(
        (coffee, index) => coffee.id === bestAllCoffeeIdArray[index]
      );

      setBestAllCoffee(bestAllCoffeeSelect);
    }
  }, [bestCoffee]);

  // 表示するコーヒー
  const switchCoffee = () => {
    switch (switchCoffeeFlag) {
      case "bestCoffee":
        return bestAllCoffee;
      case "bitterBest":
        return bestCoffee?.bitterBest;
      case "acidityBest":
        return bestCoffee?.acidityBest;
      default:
        break;
    }
  };

  useEffect(() => {
    switchCoffee();
  }, [switchCoffeeFlag]);

  return (
    <div>
      <ul css={listBox}>
        <li
          className={switchCoffeeFlag === "bestCoffee" ? "selectedList" : ""}
          onClick={() => setSwitchCoffeeFlag("bestCoffee")}
        >
          ベストコーヒー
        </li>
        <li
          className={switchCoffeeFlag === "bitterBest" ? "selectedList" : ""}
          onClick={() => setSwitchCoffeeFlag("bitterBest")}
        >
          苦味ベストコーヒー
        </li>
        <li
          className={switchCoffeeFlag === "acidityBest" ? "selectedList" : ""}
          onClick={() => setSwitchCoffeeFlag("acidityBest")}
        >
          酸味ベストコーヒー
        </li>
      </ul>
      {switchCoffee()?.length !== 0 ? (
        switchCoffee()?.map((coffee) => (
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
            <div css={userBox}>
              <div className="userBox__img">
                <Image
                  src={coffee.user_image}
                  width={50}
                  height={50}
                  layout="responsive"
                  alt="ユーザーアイコン"
                />
              </div>
              <h5>{coffee.user_name}</h5>
            </div>
            {(() => {
              if (
                loginUserStore?.admin ||
                coffee.userId === loginUserStore?.id
              ) {
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
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>ヒットしませんでした</h3>
      )}

      <CoffeeEditDialog open={editFlag} onClose={() => setEditFlag(false)} />
    </div>
  );
});

export default FeelingCoffeeDetail;

const productBox = css`
  margin: 24px auto;
  padding: 12px;
  border: 2px solid #aaa;
  border-radius: 4px;
  background-color: #fff;
  border-radius: 10px;
  width: 80%;
  min-width: 260px;

  @media screen and (max-width: 1024px) {
    width: 90%;
  }

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

const listBox = css`
  margin: 0 auto;
  padding: 0;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  background-color: #fff;
  border-radius: 4px;

  @media screen and (max-width: 1024px) {
    width: 90%;
  }

  li {
    padding: 12px;
    font-size: 20px;
    opacity: 0.7;
    width: 30%;
    text-align: center;
    border-right: 1px solid #aaa;
    cursor: pointer;

    &:last-child {
      border: none;
    }

    @media screen and (max-width: 1024px) {
      font-size: 16px;
    }
    @media screen and (max-width: 768px) {
      padding: 6px;
      font-size: 14px;
    }
  }

  .selectedList {
    font-size: 24px;
    font-weight: bold;

    @media screen and (max-width: 1024px) {
      font-size: 20px;
    }
    @media screen and (max-width: 768px) {
      padding: 6px;
      font-size: 14px;
    }
  }
`;

const userBox = css`
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;

  .userBox__img {
    margin-right: 20px;
    width: 80px;

    @media screen and (max-width: 768px) {
      width: 60px;
    }

    img {
      border-radius: 50%;
      object-fit: cover;
    }
  }

  h5 {
    font-size: 18px;

    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;
