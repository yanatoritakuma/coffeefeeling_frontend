import { User } from "@prisma/client";
import React from "react";
import firebase, { storage } from "../firebase/initFirebase";

const imageRegistration = () => {
  // 登録処理
  const onClickRegistration = (
    e: React.FormEvent<HTMLFormElement>,
    photoUrl: File | null,
    dbRegistration: (file: any) => void,
    setPhotoUrl: React.Dispatch<React.SetStateAction<File | null>>,
    setPreviewUrl: React.Dispatch<React.SetStateAction<string>>,
    user?: Omit<User, "hashedPassword"> | undefined
  ) => {
    e.preventDefault();
    if (photoUrl) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + photoUrl.name;

      const uploadImg = storage
        .ref(
          !user
            ? `userImages/${fileName}`
            : `coffeeImages/${user?.id}/${fileName}`
        )
        .put(photoUrl);

      uploadImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref(!user ? "userImages" : `coffeeImages/${user?.id}/`)
            .child(fileName)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              dbRegistration(fireBaseUrl);
            });
        }
      );
    } else {
      dbRegistration(null);
    }
    setPhotoUrl(null);
    setPreviewUrl("");
  };
  return { onClickRegistration };
};

export default imageRegistration;
