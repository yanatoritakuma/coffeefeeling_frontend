import { useCallback } from "react";
import { storage } from "../firebase/initFirebase";

export const deleteImgStorage = () => {
  const deleteImg = useCallback((coffeeImage: string | null) => {
    if (coffeeImage !== null) {
      const imgUrlStart = coffeeImage.indexOf("coffeeImages%2F");
      const imgUrlEnd = coffeeImage.indexOf("?alt");
      const deleteUrl = coffeeImage
        .substring(imgUrlStart, imgUrlEnd)
        .replace("coffeeImages%2F", "");

      const desertRef = storage.ref(`coffeeImages/${deleteUrl}`);

      desertRef
        .delete()
        .then(() => {
          console.log("削除");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return { deleteImg };
};
