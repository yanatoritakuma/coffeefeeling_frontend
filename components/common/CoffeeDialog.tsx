import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import NoImage from "../../public/noimage.png";
import { Coffee, Likes } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from "@fortawesome/free-solid-svg-icons";
import { useMutateLike } from "../../hooks/useMutateLike";
import { ButtonBox } from "../atoms/ButtonBox";
import { useMutateCoffee } from "../../hooks/useMutateCoffee";
import CoffeeEditDialog from "./CoffeeEditDialog";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setEditCoffee, setUpdateFlag } from "../../redux/editCoffeeSlice";
import { deleteImgStorage } from "../../utils/deleteImgStorage";

type Props = {
  open: boolean;
  onClose: () => void;
  bestBitterCoffeeData: Coffee[] | undefined;
  bestAcidityCoffeeData: Coffee[] | undefined;
  bestfeelingData: Coffee[] | undefined;
  likes: Likes[] | undefined;
};

export const CoffeeDialog = (props: Props) => {
  const {
    onClose,
    open,
    bestBitterCoffeeData,
    bestAcidityCoffeeData,
    bestfeelingData,
    likes,
  } = props;

  const dispatch: AppDispatch = useDispatch();

  const loginUserStore = useSelector(
    (state: RootState) => state.loginUser.user
  );

  const editCoffeeStore = useSelector(
    (state: RootState) => state.editCoffee.updateFlag
  );

  const { createLikeMutation, deleteLikeMutation } = useMutateLike();
  const { deleteCoffeeMutation } = useMutateCoffee();
  const { deleteImg } = deleteImgStorage();

  const [editFlag, setEditFlag] = useState(false);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    handleClose();
    if (editCoffeeStore) {
      dispatch(setUpdateFlag(false));
    }
  }, [editCoffeeStore]);

  const likeUser = likes?.filter((like) => like.userId === loginUserStore?.id);

  const likeCoffees = (coffeeId: number) => {
    return likeUser?.filter((like) => like.coffeeId === coffeeId);
  };

  const likeCount = (coffeeId: number) => {
    const likeNum = likes?.filter((like) => like.coffeeId === coffeeId);

    return likeNum;
  };

  // いいねクリックの処理
  const onClickLike = (coffeeId: number) => {
    const likedUser = likeCoffees(coffeeId)?.filter(
      (liked) => liked.userId === loginUserStore.id
    );

    if (loginUserStore?.id === undefined) {
      return alert("ログインしているユーザーしかいいねはできません");
    }
    if (likedUser !== undefined) {
      if (likedUser.length > 0) {
        deleteLikeMutation.mutate(coffeeId);
      } else {
        createLikeMutation.mutate({
          coffeeId: coffeeId,
        });
      }
    }
  };

  // いいね済みの商品の色変更処理
  const likeColor = (coffeeId: number) => {
    const likeFlag =
      likeUser !== undefined &&
      likeUser?.filter((like) => like.coffeeId === coffeeId).length > 0
        ? true
        : false;
    return likeFlag;
  };

  // 投稿Coffee削除
  const onClickDelete = (coffeeId: number, coffeeImage: string | null) => {
    const ret = window.confirm("削除しますか？");

    if (ret) {
      // 画像が設定してある場合firebaseStorageから画像も削除
      deleteImg(coffeeImage);
      deleteCoffeeMutation.mutate(coffeeId);
      handleClose();
      alert("削除しました。");
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" css={dialogBox}>
      <DialogTitle>
        今の気分は
        <FontAwesomeIcon className="coffeeIcon" icon={faMugSaucer} />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="closeBtn"
          onClick={handleClose}
        />
      </DialogTitle>
      <div css={bestBox}>
        <div css={contentsBox}>
          {bestfeelingData?.length !== 0 ? (
            <h3 className="best">ベストコーヒー</h3>
          ) : (
            <h3 className="best">ベストコーヒーにはヒットしませんでした。</h3>
          )}
          {bestfeelingData?.map((coffee) => (
            <div key={coffee.id} css={productBox}>
              {coffee.image !== null ? (
                <img css={imgCoffee} src={coffee.image} alt="画像" />
              ) : (
                <Image src={NoImage} alt="画像なし" />
              )}
              <div className="productNameBox">
                <span>商品名</span>
                <h4>{coffee.name}</h4>
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
          ))}
        </div>
        <div css={contentsBox}>
          {bestBitterCoffeeData?.length !== 0 ? (
            <h3 className="bitter">苦味ベストコーヒー</h3>
          ) : (
            <h3 className="bitter">
              苦味ベストコーヒーにはヒットしませんでした。
            </h3>
          )}
          {bestBitterCoffeeData?.map((coffee) => (
            <div key={coffee.id} css={productBox}>
              {coffee.image !== null ? (
                <img css={imgCoffee} src={coffee.image} alt="画像" />
              ) : (
                <Image src={NoImage} alt="画像なし" />
              )}
              <div className="productNameBox">
                <span>商品名</span>
                <h4>{coffee.name}</h4>
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
          ))}
        </div>
        <div css={contentsBox}>
          {bestAcidityCoffeeData?.length !== 0 ? (
            <h3 className="acidity">酸味ベストコーヒー</h3>
          ) : (
            <h3 className="acidity">
              酸味ベストコーヒーはヒットしませんでした。
            </h3>
          )}
          {bestAcidityCoffeeData?.map((coffee) => (
            <div key={coffee.id} css={productBox}>
              {coffee.image !== null ? (
                <img css={imgCoffee} src={coffee.image} alt="画像" />
              ) : (
                <Image src={NoImage} alt="画像なし" />
              )}
              <div className="productNameBox">
                <span>商品名</span>
                <h4>{coffee.name}</h4>
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
          ))}
        </div>
      </div>
      <CoffeeEditDialog open={editFlag} onClose={() => setEditFlag(false)} />
    </Dialog>
  );
};

const dialogBox = css`
  .css-2rbg70-MuiPaper-root-MuiDialog-paper {
    padding: 20px;
    width: 100%;
    min-width: 290px;
    background-color: #eae5e3;

    @media screen and (max-width: 425px) {
      padding: 12px;
    }
  }

  h2 {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #7b5544;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1024px) {
      font-size: 24px;
    }

    .coffeeIcon {
      margin-left: 6px;
      color: #7b5544;
      width: 38px;
      height: 38px;

      @media screen and (max-width: 768px) {
        width: 28px;
        height: 28px;
      }
    }

    .closeBtn {
      position: absolute;
      top: 0;
      right: 0;
      width: 38px;
      height: 38px;
      color: #333;
      cursor: pointer;

      @media screen and (max-width: 425px) {
        width: 28px;
        height: 28px;
      }
    }
  }
`;

const imgCoffee = css`
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 600px;
`;

const bestBox = css`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: block;
  }

  h3 {
    text-align: center;
    font-size: 24px;

    @media screen and (max-width: 1024px) {
      font-size: 20px;
    }
  }

  .best {
    color: #ea5550;
  }

  .bitter {
    color: #24140e;
  }

  .acidity {
    color: #9fc24d;
  }
`;

const contentsBox = css`
  margin: 0 auto;
  padding: 14px;
  width: 30%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 4px 4px 2px #dddcd6;
  overflow-wrap: break-word;

  @media screen and (max-width: 768px) {
    margin: 30px auto;
    width: 100%;
  }
`;

const productBox = css`
  margin: 12px 0;
  padding: 12px;
  border: 2px solid #aaa;
  border-radius: 4px;

  .productNameBox {
    display: flex;
    align-items: center;
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

const evaluationMainBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;

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
`;
