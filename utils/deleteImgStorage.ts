import { useCallback } from "react";
import { storage } from "../firebase/initFirebase";

export const deleteImgStorage = () => {
  const deleteImg = useCallback(
    (image: string | null, targetStorage: "coffeeImages" | "userImages") => {
      if (image !== null) {
        const imgUrlStart = image.indexOf(targetStorage + "%2F");
        const imgUrlEnd = image.indexOf("?alt");
        const deleteUrl = image
          .substring(imgUrlStart, imgUrlEnd)
          .replace(targetStorage + "%2F", "");

        const desertRef = storage.ref(`${targetStorage}/${deleteUrl}`);

        desertRef
          .delete()
          .then(() => {
            console.log("削除");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    []
  );

  return { deleteImg };
};
