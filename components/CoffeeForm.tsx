import React, { useState, useEffect, useCallback } from "react";
import { TextInput, Button, Center, Select } from "@mantine/core";
import { IconDatabase } from "@tabler/icons";
import { useMutateCoffee } from "../hooks/useMutateCoffee";
import Image from "next/image";
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
  const [coffeeState, setCoffeeState] = useState<TCoffeeState>({
    id: 0,
    name: "",
    image: null,
    category: "",
    bitter: 0,
    acidity: 0,
    price: 0,
    place: "",
  });

  console.log("coffeeState", coffeeState);

  const { createCoffeeMutation, updateCoffeeMutation } = useMutateCoffee();

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
      bitter: 0,
      acidity: 0,
      price: 0,
      place: "",
    });
  };

  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  console.log("photoUrl", photoUrl);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPhotoUrl(e.target.files![0]);
      e.target.value = "";
    }
  };

  const onClickRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    const ret = window.confirm("この内容で登録しますか？");
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
        handleSubmit("");
      }
      setPhotoUrl(null);
      alert("登録完了しました。");
    }
  };

  return (
    <>
      <form onSubmit={onClickRegistration}>
        <TextInput
          mt="md"
          placeholder="商品名"
          value={coffeeState.name}
          onChange={(e) =>
            setCoffeeState({ ...coffeeState, name: e.target.value })
          }
        />
        <input type="file" onChange={onChangeImageHandler} />
        <Select
          style={{ zIndex: 2 }}
          data={[
            "ブラック",
            "カフェラテ",
            "エスプレッソ",
            "カフェモカ",
            "カフェオレ",
            "カプチーノ",
          ]}
          placeholder="カテゴリー"
          label="カテゴリー"
          value={String(coffeeState.category)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              category: String(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          placeholder="苦さ"
          label="苦さ"
          value={String(coffeeState.bitter)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              bitter: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          placeholder="酸味"
          label="酸味"
          value={String(coffeeState.acidity)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              acidity: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["100", "300", "500", "700", "1000"]}
          placeholder="値段"
          label="値段"
          value={String(coffeeState.price)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              price: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["コンビニ", "店舗"]}
          placeholder="場所"
          label="場所"
          value={String(coffeeState.place)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              place: String(e),
            })
          }
        />
        <Center mt="lg">
          <Button
            disabled={coffeeState.name === ""}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {coffeeState.id === 0 ? "Create" : "Update"}
          </Button>
        </Center>
      </form>
      {/* <form onSubmit={onClickRegistration}>
        <p>testInput</p>
        <input type="file" onChange={onChangeImageHandler} />
        <Button color="cyan" type="submit">
          testImg
        </Button>
      </form> */}
    </>
  );
};
