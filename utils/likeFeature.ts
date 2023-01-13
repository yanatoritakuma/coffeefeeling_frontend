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
  const [initLikes, setInitLikes] = useState<TInitLikes[] | null>([]);
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

  // いいね済みの商品の色変更処理
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

  return { onClickLike, likeColor, initLikeArray };
};

export default likeFeature;
