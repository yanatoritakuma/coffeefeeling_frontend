import { useCallback } from "react";
import { storage } from "../firebase/initFirebase";

export const deleteImgStorage = () => {
  // 対象1つのimgを削除
  const deleteImg = useCallback(
    (
      image: string | null,
      targetStorage: "coffeeImages" | "userImages",
      userId?: number
    ) => {
      if (image !== null) {
        const imgUrlStart = image.indexOf(targetStorage + "%2F");
        const imgUrlEnd = image.indexOf("?alt");
        const deletePostCoffeeUrl = image
          .substring(imgUrlStart, imgUrlEnd)
          .replace(targetStorage + `%2F${userId}%2F`, "");
        const deleteUserUrl = image
          .substring(imgUrlStart, imgUrlEnd)
          .replace(targetStorage + "%2F", "");

        if (targetStorage === "coffeeImages") {
          const desertRef = storage.ref(
            `${targetStorage}/${userId}/${deletePostCoffeeUrl}`
          );

          desertRef
            .delete()
            .then(() => {
              console.log("削除");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const desertRef = storage.ref(`${targetStorage}/${deleteUserUrl}`);

          desertRef
            .delete()
            .then(() => {
              console.log("削除");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    []
  );

  // 対象ユーザーの投稿img全て削除
  const deleteAllUserPostsImg = useCallback((userId: number) => {
    const desertRef = storage.ref(`coffeeImages/${userId}`);
    // フォルダ配下のアイテムをすべて取得
    desertRef.listAll().then((res) => {
      res.items.map((item) => {
        item.delete();
      });
    });
  }, []);

  return { deleteImg, deleteAllUserPostsImg };
};
