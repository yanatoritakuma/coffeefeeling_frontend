import React, { useState, useEffect, FormEvent } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import FormImg from "../../public/feeling.jpg";
import { SelectBox } from "../../components/atoms/SelectBox";
import { SelectChangeEvent } from "@mui/material/Select";
import { SliderBox } from "../../components/atoms/SliderBox";
import { ButtonBox } from "../../components/atoms/ButtonBox";
import { useRouter } from "next/router";

const Feeling = () => {
  const router = useRouter();

  // ユーザー選択
  const [selectCoffee, setSelectCoffee] = useState({
    category: "ブラック",
    bitter: 1,
    acidity: 1,
    price: 100,
    place: "コンビニ",
  });

  const [searchFlag, setSearchFlag] = useState(false);

  const onClickSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchFlag(true);
  };

  useEffect(() => {
    if (searchFlag) {
      setSearchFlag(false);

      router.push({ pathname: `/feeling/feelNow`, query: selectCoffee });
    }
  }, [searchFlag]);

  return (
    <section css={feelingMainBox}>
      <div css={feelingBox}>
        <Image src={FormImg} priority layout="fill" css={feelingImg} alt="feelingImg" />
        <h2>Feeling</h2>
        <div css={selectBox}>
          <SelectBox
            value={selectCoffee.category}
            onChange={(e: SelectChangeEvent) =>
              setSelectCoffee({
                ...selectCoffee,
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
          <span>苦さ{selectCoffee.bitter}</span>
          <SliderBox
            value={selectCoffee.bitter}
            onChange={(e) =>
              setSelectCoffee({
                ...selectCoffee,
                bitter: e.target.value,
              })
            }
            max={10}
            min={1}
          />
        </div>
        <div css={sliderBox("#9fc24d")}>
          <span>酸味{selectCoffee.acidity}</span>
          <SliderBox
            value={selectCoffee.acidity}
            onChange={(e) =>
              setSelectCoffee({
                ...selectCoffee,
                acidity: e.target.value,
              })
            }
            max={10}
            min={1}
          />
        </div>

        <div css={selectBox}>
          <SelectBox
            value={String(selectCoffee.price)}
            onChange={(e: SelectChangeEvent) =>
              setSelectCoffee({
                ...selectCoffee,
                price: Number(e.target.value),
              })
            }
            label="値段"
            menuItems={["100", "300", "500", "700", "1000"]}
          />
        </div>

        <div css={selectBox}>
          <SelectBox
            value={selectCoffee.place}
            onChange={(e: SelectChangeEvent) =>
              setSelectCoffee({
                ...selectCoffee,
                place: e.target.value,
              })
            }
            label="場所"
            menuItems={["コンビニ", "店舗"]}
          />
        </div>
        <div css={btnBox}>
          <ButtonBox onClick={(e) => onClickSearch(e)}>気分で飲む</ButtonBox>
        </div>
      </div>
    </section>
  );
};

export default Feeling;

const feelingMainBox = css`
  width: 100%;
  height: 100vh;
  position: relative;

  .fileter {
    background-color: #333;
    opacity: 0.7;
    position: fixed;
    top: 0;
    z-index: 500;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const feelingBox = css`
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 1200px;

  h2 {
    margin-top: 90px;
    font-size: 60px;
    color: #fff;
    font-family: "Kalam", cursive;
    text-align: center;
  }
`;

const feelingImg = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
`;

const selectBox = css`
  margin: 10px 0;
  padding: 12px;
  background-color: #fff;
  border-radius: 10px;
  min-width: 280px;
`;

const sliderBox = (color: string) => css`
  margin: 10px 0;
  padding: 12px;
  width: 30%;
  min-width: 280px;
  background-color: #fff;
  border-radius: 10px;

  span {
    color: ${color};
  }
`;

const btnBox = css`
  margin: 24px 0;
  text-align: center;
  button {
    width: 50%;
    font-size: 18px;
  }
`;
