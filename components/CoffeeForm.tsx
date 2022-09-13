import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { TextBox } from "../components/atoms/TextBox";
import { SelectBox } from "../components/atoms/SelectBox";
import { SelectChangeEvent } from "@mui/material/Select";
import { ButtonBox } from "../components/atoms/ButtonBox";
import { SliderBox } from "../components/atoms/SliderBox";
import { useMutateCoffee } from "../hooks/useMutateCoffee";
import Image from "next/image";
import FormImg from "../public/form.jpg";
import firebase, { storage } from "../firebase/initFirebase";

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

export const CoffeeForm = () => {
  const { createCoffeeMutation, updateCoffeeMutation } = useMutateCoffee();

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

  // アップロード画像state
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);

  // 画像プレビュー用のstate
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // db登録処理
  // file: File | nullに戻す
  const handleSubmit = (file: any) => {
    if (coffeeState.id === 0) {
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

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPhotoUrl(e.target.files![0]);
      e.target.value = "";
    }
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

  // 登録処理
  const onClickRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    const ret = window.confirm("この内容で登録しますか？");

    // バリデーション
    if (
      coffeeState.name === "" ||
      coffeeState.category === "" ||
      coffeeState.place === ""
    ) {
      return alert("名前、カテゴリー、場所は必須です。");
    }

    if (ret) {
      e.preventDefault();
      if (photoUrl) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(
          crypto.getRandomValues(new Uint32Array(N))
        )
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + photoUrl.name;
        const uploadImg = storage.ref(`images/${fileName}`).put(photoUrl);
        uploadImg.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          (err) => {
            alert(err.message);
          },
          async () => {
            await storage
              .ref("images")
              .child(fileName)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                handleSubmit(fireBaseUrl);
              });
          }
        );
      } else {
        handleSubmit(null);
      }
      setPhotoUrl(null);
      setPreviewUrl("");
      alert("登録完了しました。");
    }
  };

  return (
    <section css={coffeeFormMainBox}>
      <Image src={FormImg} layout="fill" css={formImg} alt="backgImage" />
      <div css={coffeeFormBox}>
        <h3>投稿画面</h3>
        <div css={textBox}>
          <TextBox
            value={coffeeState.name}
            onChange={(e) =>
              setCoffeeState({ ...coffeeState, name: e.target.value })
            }
            label="商品名"
          />
        </div>
        <div css={formStateBox}>
          <ButtonBox upload onChange={onChangeImageHandler} />
        </div>
        <div style={{ textAlign: "center" }}>
          {previewUrl ? (
            <Image src={previewUrl} alt="画像" width={400} height={340} />
          ) : null}
        </div>

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
          <ButtonBox onClick={(e) => onClickRegistration(e)}>
            投稿する
          </ButtonBox>
        </div>
      </div>
    </section>
  );
};

const coffeeFormMainBox = css`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const coffeeFormBox = css`
  margin: 0 auto;
  padding: 60px 20px 20px 20px;
  width: 50%;
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
  height: 90%;

  h3 {
    text-align: center;
    font-size: 26px;
  }
`;

const formImg = css`
  object-fit: cover;
`;

const textBox = css`
  margin: 20px 0;

  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    background-color: #fff;
  }
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
