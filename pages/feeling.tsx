import React, { useState, useEffect, FormEvent } from "react";
import { css } from "@emotion/react";
import { useQueryFeelingCoffees } from "../hooks/useQueryFeelingCoffees";
import { AxiosRequestConfig } from "axios";
import { Coffee } from "@prisma/client";
import Image from "next/image";
import FormImg from "../public/feeling.jpg";
import { CoffeeDialog } from "../components/common/CoffeeDialog";
import { SelectBox } from "../components/atoms/SelectBox";
import { SelectChangeEvent } from "@mui/material/Select";
import { SliderBox } from "../components/atoms/SliderBox";
import { ButtonBox } from "../components/atoms/ButtonBox";
import { useQueryLikes } from "../hooks/useQueryLikes";
import { useQueryUser } from "../hooks/useQueryUser";

const Feeling = () => {
  const { getFeelingCoffees, feelingData } = useQueryFeelingCoffees();

  const { data: likes } = useQueryLikes();
  // ログインしないと入れなくなった
  const { data: user } = useQueryUser();

  // ユーザー選択
  const [selectCoffee, setSelectCoffee] = useState({
    category: "ブラック",
    bitter: 1,
    acidity: 1,
    price: 100,
    place: "コンビニ",
  });

  // 苦さの評価にヒットしたコーヒー
  const [bestBitterCoffeeData, setBestBitterCoffeeData] = useState<Coffee[]>();

  // 酸味の評価にヒットしたコーヒー
  const [bestAcidityCoffeeData, setBestAcidityCoffeeData] =
    useState<Coffee[]>();

  // 総合での評価にヒットしたコーヒー
  const [bestfeelingData, setBestfeelingData] = useState<Coffee[]>();

  // 検索して結果ダイアログ
  const [open, setOpen] = useState(false);

  const requestParam: AxiosRequestConfig = {
    data: {
      category: selectCoffee.category,
      bitter: selectCoffee.bitter,
      acidity: selectCoffee.acidity,
      price: selectCoffee.price,
      place: selectCoffee.place,
    },
  };

  const onClickSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBestBitterCoffeeData([]);
    setBestAcidityCoffeeData([]);
    setBestfeelingData([]);
    getFeelingCoffees(requestParam);
    setOpen(true);
  };

  useEffect(() => {
    if (feelingData.length !== 0) {
      // ユーザーが選択した「カテゴリー、値段、場所」が一致したコーヒーの苦さ数値取得
      const selectBitter = feelingData.map((coffee: Coffee) => {
        return Number(coffee.bitter);
      });

      // ユーザーが選択した苦さの評価にもっとも近い苦さ評価値取得
      const bestBitter = selectBitter.reduce((prev, curr) => {
        return Math.abs(curr - selectCoffee.bitter) <
          Math.abs(prev - selectCoffee.bitter)
          ? curr
          : prev;
      });

      // ユーザーが選択した苦さの評価にもっとも近い商品取得
      const bestBitterCoffee = feelingData.filter(
        (coffee) => coffee.bitter === bestBitter
      );

      setBestBitterCoffeeData(bestBitterCoffee);

      // ユーザーが選択した「カテゴリー、値段、場所」が一致したコーヒーの酸味数値取得
      const selectAcidity = feelingData.map((coffee: Coffee) => {
        return Number(coffee.acidity);
      });

      // ユーザーが選択した苦さの評価にもっとも近い酸味評価値取得
      const bestAcidity = selectAcidity.reduce((prev, curr) => {
        return Math.abs(curr - selectCoffee.acidity) <
          Math.abs(prev - selectCoffee.acidity)
          ? curr
          : prev;
      });

      // ユーザーが選択した酸味の評価にもっとも近い商品取得
      const bestAcidityCoffee = feelingData.filter(
        (coffee) => coffee.acidity === bestAcidity
      );

      setBestAcidityCoffeeData(bestAcidityCoffee);

      const bestArray = [...bestBitterCoffee, ...bestAcidityCoffee];

      const bestfeeling = bestArray.filter(
        (coffee) =>
          bestBitterCoffee.includes(coffee) &&
          bestAcidityCoffee.includes(coffee)
      );

      const setCoffee = new Set(bestfeeling);
      const bestCoffees = [...setCoffee];

      setBestfeelingData(bestCoffees);
    }
  }, [feelingData]);

  return (
    <section css={feelingMainBox}>
      <div css={feelingBox}>
        <Image src={FormImg} layout="fill" css={feelingImg} alt="feelingImg" />
        <h2>今の気分で選ぼう</h2>
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

        <CoffeeDialog
          open={open}
          onClose={() => setOpen(false)}
          bestBitterCoffeeData={bestBitterCoffeeData}
          bestAcidityCoffeeData={bestAcidityCoffeeData}
          bestfeelingData={bestfeelingData}
          likes={likes}
          loginUser={user}
        />
      </div>
    </section>
  );
};

export default Feeling;

const feelingMainBox = css`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const feelingBox = css`
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 1200px;

  h2 {
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
