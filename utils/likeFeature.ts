import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutateLike } from "../hooks/useMutateLike";
import { useQueryCoffeeIdLikes } from "../hooks/useQueryCoffeeIdLikes";
import { RootState } from "../redux/store";
import { TUserId } from "../types/coffee";

const likeFeature = () => {
  const { createLikeMutation, deleteLikeMutation } = useMutateLike();

  const loginUserStore = useSelector(
    (state: RootState) => state.loginUser.user
  );

  // coffeeId配列を格納
  const [coffeeIdArray, setCoffeeIdArray] = useState<number[]>([]);
  // useQueryFeelingLikes（いいね取得API）に渡す変数
  const [coffeeIdArrayReq, setCoffeeIdArrayReq] = useState({
    coffeeId1: 0,
    coffeeId2: 0,
    coffeeId3: 0,
    coffeeId4: 0,
    coffeeId5: 0,
    coffeeId6: 0,
    coffeeId7: 0,
    coffeeId8: 0,
    coffeeId9: 0,
    coffeeId10: 0,
  });

  const refetchSetTime = () => {
    refetch();
  };

  useEffect(() => {
    if (coffeeIdArray.length !== 0) {
      setCoffeeIdArrayReq({
        ...coffeeIdArrayReq,
        coffeeId1: coffeeIdArray[0] !== undefined ? coffeeIdArray[0] : 0,
        coffeeId2: coffeeIdArray[1] !== undefined ? coffeeIdArray[1] : 0,
        coffeeId3: coffeeIdArray[2] !== undefined ? coffeeIdArray[2] : 0,
        coffeeId4: coffeeIdArray[3] !== undefined ? coffeeIdArray[3] : 0,
        coffeeId5: coffeeIdArray[4] !== undefined ? coffeeIdArray[4] : 0,
        coffeeId6: coffeeIdArray[5] !== undefined ? coffeeIdArray[5] : 0,
        coffeeId7: coffeeIdArray[6] !== undefined ? coffeeIdArray[6] : 0,
        coffeeId8: coffeeIdArray[7] !== undefined ? coffeeIdArray[7] : 0,
        coffeeId9: coffeeIdArray[8] !== undefined ? coffeeIdArray[8] : 0,
        coffeeId10: coffeeIdArray[9] !== undefined ? coffeeIdArray[9] : 0,
      });
    }
    setTimeout(refetchSetTime, 100);
  }, [coffeeIdArray]);

  const { data: coffeeIdLikes, refetch } =
    useQueryCoffeeIdLikes(coffeeIdArrayReq);

  const likeUser = coffeeIdLikes?.filter(
    (like) => like.userId === loginUserStore?.id
  );

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

  const likeColor2 = (userIds: TUserId[]) => {
    const likeUsers = userIds.map((id) => {
      return id.userId;
    });

    const likeFlag = likeUsers.indexOf(loginUserStore.id) === -1 ? false : true;

    return likeFlag;
  };

  // いいねの数表示
  const likeCount = (coffeeId: number) => {
    const likeNum = coffeeIdLikes?.filter((like) => like.coffeeId === coffeeId);

    return likeNum;
  };

  // coffeeIdを取得
  const getCoffeeId = (coffeeIds: number[]) => {
    return setCoffeeIdArray(coffeeIds);
  };

  return { onClickLike, likeColor, likeColor2, likeCount, getCoffeeId };
};

export default likeFeature;
