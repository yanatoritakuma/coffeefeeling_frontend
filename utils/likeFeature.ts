import { useSelector } from "react-redux";
import { useMutateLike } from "../hooks/useMutateLike";
import { RootState } from "../redux/store";

const likeFeature = () => {
  const { createLikeMutation, deleteLikeMutation } = useMutateLike();

  const loginUserStore = useSelector((state: RootState) => state.loginUser.user);

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

  return { onClickLike, likeColor };
};

export default likeFeature;
