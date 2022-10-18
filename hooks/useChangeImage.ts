import React, { useState } from "react";

const useChangeImage = () => {
  // アップロード画像state
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPhotoUrl(e.target.files![0]);
      e.target.value = "";
    }
  };

  return { onChangeImageHandler, photoUrl, setPhotoUrl };
};

export default useChangeImage;
