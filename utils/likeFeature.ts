import React from "react";
import { useSelector } from "react-redux";
import { useMutateLike } from "../hooks/useMutateLike";
import { useQueryLikes } from "../hooks/useQueryLikes";
import { RootState } from "../redux/store";

const likeFeature = () => {
  const { data: likes } = useQueryLikes();
  const { createLikeMutation, deleteLikeMutation } = useMutateLike();

  const loginUserStore = useSelector(
    (state: RootState) => state.loginUser.user
  );

  const likeUser = likes?.filter((like) => like.userId === loginUserStore?.id);

  const likeCoffees = (coffeeId: number) => {
    return likeUser?.filter((like) => like.coffeeId === coffeeId);
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

  // いいねの数表示
  const likeCount = (coffeeId: number) => {
    const likeNum = likes?.filter((like) => like.coffeeId === coffeeId);

    return likeNum;
  };

  return { onClickLike, likeColor, likeCount };
};

export default likeFeature;
