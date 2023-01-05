import React, { useState, useEffect, memo } from "react";
import { css } from "@emotion/react";
import { TextBox } from "../atoms/TextBox";
import { SelectBox } from "../atoms/SelectBox";
import { SelectChangeEvent } from "@mui/material/Select";
import { ButtonBox } from "../atoms/ButtonBox";
import { SliderBox } from "../atoms/SliderBox";
import { useMutateCoffee } from "../../hooks/useMutateCoffee";
import Image from "next/image";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import NoImage from "../../public/noimage.png";
import { deleteImgStorage } from "../../utils/deleteImgStorage";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setUpdateFlag } from "../../redux/editCoffeeSlice";
import { useQueryUser } from "../../hooks/useQueryUser";
import useChangeImage from "../../hooks/useChangeImage";
import imageRegistration from "../../utils/imageRegistration";

type Props = {
  fromWidth?: string;
  editType?: boolean;
};

type TCoffeeState = {
  id: number;
  name: string;
  image: File | null;
  category: string;
  bitter: number;
  acidity: number;
  price: number;
  place: string;
};

export const CoffeeForm = memo((props: Props) => {
  const { fromWidth, editType } = props;

  const { data: user } = useQueryUser();
  const { createCoffeeMutation, updateCoffeeMutation } = useMutateCoffee();
  const dispatch: AppDispatch = useDispatch();

  const editCoffeeStore = useSelector((state: RootState) => state.editCoffee.editCoffee);

  // アップロード画像hooks
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();

  const { deleteImg } = deleteImgStorage();

  // 登録state
  const [coffeeState, setCoffeeState] = useState<TCoffeeState>({
    id: 0,
    name: "",
    image: null,
    category: "",
    bitter: 1,
    acidity: 1,
    price: 100,
    place: "",
  });

  useEffect(() => {
    if (editType) {
      setCoffeeState({
        ...coffeeState,
        id: editCoffeeStore.id,
        name: editCoffeeStore.name,
        category: editCoffeeStore.category,
        bitter: editCoffeeStore.bitter,
        acidity: editCoffeeStore.acidity,
        price: editCoffeeStore.price,
        place: editCoffeeStore.place,
      });
    }
  }, []);

  // 画像プレビュー用のstate
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // db登録処理
  const dbRegistration = (file: any) => {
    if (coffeeState.id === 0) {
      // 新規登録
      createCoffeeMutation.mutate({
        name: coffeeState.name,
        image: file,
        category: coffeeState.category,
        bitter: coffeeState.bitter,
        acidity: coffeeState.acidity,
        price: coffeeState.price,
        place: coffeeState.place,
      });
    } else {
      // 画像が変更されていない場合の更新処理
      if (file === null) {
        updateCoffeeMutation.mutate({
          id: coffeeState.id,
          name: coffeeState.name,
          category: coffeeState.category,
          bitter: coffeeState.bitter,
          acidity: coffeeState.acidity,
          price: coffeeState.price,
          place: coffeeState.place,
        });
      } else {
        // 画像が変更されている場合の更新処理
        updateCoffeeMutation.mutate({
          id: coffeeState.id,
          name: coffeeState.name,
          image: file,
          category: coffeeState.category,
          bitter: coffeeState.bitter,
          acidity: coffeeState.acidity,
          price: coffeeState.price,
          place: coffeeState.place,
        });
        // 既に登録済みの画像を削除
        deleteImg(editCoffeeStore.image, "coffeeImages", editCoffeeStore.userId);
      }
    }
    setCoffeeState({
      id: 0,
      name: "",
      image: null,
      category: "",
      bitter: 1,
      acidity: 1,
      price: 100,
      place: "",
    });
  };

  // プレビューの画像処理
  useEffect(() => {
    if (!photoUrl) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const res = reader!.result;
      if (res && typeof res === "string") {
        setPreviewUrl(res);
      }
    };
    reader.readAsDataURL(photoUrl);

    return () => {
      reader = null;
    };
  }, [photoUrl]);

  const { onClickRegistration } = imageRegistration();

  // 登録処理
  const onClickCoffeeRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    const ret = window.confirm("この内容で登録しますか？");
    // バリデーション
    if (coffeeState.name === "" || coffeeState.category === "" || coffeeState.place === "") {
      return alert("名前、カテゴリー、場所は必須です。");
    }

    if (ret) {
      onClickRegistration(e, photoUrl, dbRegistration, setPhotoUrl, setPreviewUrl, user);

      dispatch(setUpdateFlag(true));
      alert("登録完了しました。");
    }
  };

  return (
    <section css={coffeeFormMainBox}>
      <div css={coffeeFormBox(fromWidth === undefined ? "50%" : fromWidth)}>
        <h3>{!editType ? "投稿画面" : "編集画面"}</h3>
        <div css={textBox}>
          <TextBox
            value={coffeeState.name}
            onChange={(e) => setCoffeeState({ ...coffeeState, name: e.target.value })}
            label="商品名"
            fullWidth
          />
        </div>
        <div css={formStateBox}>
          <ButtonBox upload onChange={onChangeImageHandler} />
        </div>
        {previewUrl !== "" || !editType ? (
          <div css={imgBox}>
            {previewUrl ? <Image src={previewUrl} alt="画像" width={400} height={340} /> : null}
          </div>
        ) : (
          <div css={imgBox}>
            {editCoffeeStore.image ? (
              <Image src={editCoffeeStore.image} alt="画像" width={400} height={340} />
            ) : (
              <Image src={NoImage} alt="画像なし" width={400} height={340} />
            )}
          </div>
        )}

        <div css={formStateBox}>
          <SelectBox
            value={coffeeState.category}
            onChange={(e: SelectChangeEvent) =>
              setCoffeeState({
                ...coffeeState,
                category: e.target.value,
              })
            }
            label="カテゴリー"
            menuItems={[
              "ブラック",
              "カフェラテ",
              "エスプレッソ",
              "カフェモカ",
              "カフェオレ",
              "カプチーノ",
            ]}
          />
        </div>

        <div css={sliderBox("#24140e")}>
          <span>苦さ{coffeeState.bitter}</span>
          <SliderBox
            value={coffeeState.bitter}
            onChange={(e) =>
              setCoffeeState({
                ...coffeeState,
                bitter: e.target.value,
              })
            }
            max={10}
            min={1}
          />
        </div>

        <div css={sliderBox("#9fc24d")}>
          <span>酸味{coffeeState.acidity}</span>
          <SliderBox
            value={coffeeState.acidity}
            onChange={(e) =>
              setCoffeeState({
                ...coffeeState,
                acidity: e.target.value,
              })
            }
            max={10}
            min={1}
          />
        </div>

        <div css={formStateBox}>
          <SelectBox
            value={String(coffeeState.price)}
            onChange={(e: SelectChangeEvent) =>
              setCoffeeState({
                ...coffeeState,
                price: Number(e.target.value),
              })
            }
            label="値段"
            menuItems={["100", "300", "500", "700", "1000"]}
          />
        </div>
        <div css={formStateBox}>
          <SelectBox
            value={coffeeState.place}
            onChange={(e: SelectChangeEvent) =>
              setCoffeeState({
                ...coffeeState,
                place: e.target.value,
              })
            }
            label="場所"
            menuItems={["コンビニ", "店舗"]}
          />
        </div>
        <div css={btnBox}>
          <ButtonBox onClick={(e) => onClickCoffeeRegistration(e)}>
            {!editType ? "投稿する" : "更新する"}
          </ButtonBox>
        </div>
      </div>
    </section>
  );
});

const coffeeFormMainBox = css`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

const coffeeFormBox = (width: string) => css`
  margin: 0 auto;
  padding: 60px 20px 20px 20px;
  width: ${width};
  min-width: 300px;
  max-width: 1200px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: #fff;
  border-radius: 10px;
  overflow-y: auto;
  height: 80%;

  h3 {
    text-align: center;
    font-size: 26px;
  }
`;

const textBox = css`
  margin: 20px 0;
`;

const sliderBox = (color: string) => css`
  margin: 10px 0;
  padding: 12px;
  width: 30%;
  min-width: 260px;
  border-radius: 10px;

  span {
    color: ${color};
  }
`;

const formStateBox = css`
  margin: 26px 0;
`;

const btnBox = css`
  text-align: center;
  button {
    padding: 12px;
    width: 80%;
    font-size: 16px;
  }
`;

const imgBox = css`
  text-align: center;

  img {
    object-fit: contain;
  }
`;
