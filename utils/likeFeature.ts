import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutateLike } from "../hooks/useMutateLike";
import { RootState } from "../redux/store";
import { TCoffee } from "../types/coffee";

export type TInitLikes = {
  coffeeId: number;
  likeUseIds: number[];
  likedFlag: boolean;
};

const likeFeature = () => {
  const { createLikeMutation, deleteLikeMutation } = useMutateLike();

  const loginUserStore = useSelector((state: RootState) => state.loginUser.user);

  // 初期状態のいいね
  const [initLikes, setInitLikes] = useState<TInitLikes[]>([]);
  console.log("initLikes", initLikes);

  // いいねクリックの処理
  const onClickLike = (likesUserIds: number[], coffeeId: number) => {
    if (loginUserStore === undefined) {
      return alert("ログインしていないユーザーはいいねできません。");
    }

    const likedUser = likesUserIds.filter((id) => {
      return id === loginUserStore.id;
    });

    if (likedUser.length > 0) {
      deleteLikeMutation.mutate(coffeeId);
    } else {
      createLikeMutation.mutate({
        coffeeId: coffeeId,
      });
    }
  };

  // いいね済みの商品の色変更処理（最終的にlikeColor2を使用するので削除する）
  const likeColor = (likesUserIds: number[]) => {
    const likeFlag = likesUserIds?.indexOf(loginUserStore?.id) === -1 ? false : true;

    return likeFlag;
  };

  // いいねの初期状態を格納
  const initLikeArray = (coffees: TCoffee[] | undefined) => {
    const newArray: TInitLikes[] | null = [];
    coffees?.map((coffee) => {
      const initLikeArray = {
        coffeeId: coffee.id,
        likeUseIds: coffee.like_user_id,
        likedFlag: coffee.like_user_id.indexOf(loginUserStore.id) !== -1 ? true : false,
      };

      newArray.push(initLikeArray);
    });

    setInitLikes(newArray);
  };

  // いいねの色
  const likeColor2 = (coffeeId: number) => {
    const displayLikeArray = initLikes?.filter((like) => {
      return like.coffeeId === coffeeId && like.likedFlag;
    });

    return displayLikeArray[0];
  };

  // フロント完結のいいね処理
  const onClickDisplayLike = (coffeeId: number) => {
    const newArray = [...initLikes];

    const displayLikeArray = newArray.filter((like) => {
      return like.coffeeId === coffeeId;
    });

    displayLikeArray[0].likedFlag = !displayLikeArray[0].likedFlag;

    setInitLikes(displayLikeArray);

    setTimeout(() => {
      console.log("いいね処理終了");
    }, 5000);
  };

  return { onClickLike, likeColor, initLikeArray, likeColor2, onClickDisplayLike, initLikes };
};

export default likeFeature;
