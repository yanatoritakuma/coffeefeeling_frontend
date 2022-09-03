import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@mantine/core";
import { css } from "@emotion/react";
import { Select } from "@mantine/core";
import { useQueryFeelingCoffees } from "../hooks/useQueryFeelingCoffees";
import { AxiosRequestConfig } from "axios";
import { Coffee } from "@prisma/client";

const Feeling = () => {
  // ユーザー選択
  const [selectCoffee, setSelectCoffee] = useState({
    category: "ブラック",
    bitter: 0,
    acidity: 0,
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

  const requestParam: AxiosRequestConfig = {
    data: {
      category: selectCoffee.category,
      bitter: selectCoffee.bitter,
      acidity: selectCoffee.acidity,
      price: selectCoffee.price,
      place: selectCoffee.place,
    },
  };

  const { getFeelingCoffees, feelingData } = useQueryFeelingCoffees();

  const onClickSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBestBitterCoffeeData([]);
    setBestAcidityCoffeeData([]);
    setBestfeelingData([]);
    getFeelingCoffees(requestParam);
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

  console.log("bestfeelingData", bestfeelingData);

  return (
    <section css={feelingBox}>
      <h2>今の気分で選ぼう</h2>
      <form onSubmit={onClickSearch}>
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
          value={String(selectCoffee.category)}
          onChange={(e) =>
            setSelectCoffee({
              ...selectCoffee,
              category: String(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          placeholder="苦さ"
          label="苦さ"
          value={String(selectCoffee.bitter)}
          onChange={(e) =>
            setSelectCoffee({
              ...selectCoffee,
              bitter: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          placeholder="酸味"
          label="酸味"
          value={String(selectCoffee.acidity)}
          onChange={(e) =>
            setSelectCoffee({
              ...selectCoffee,
              acidity: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["100", "300", "500", "700", "1000"]}
          placeholder="値段"
          label="値段"
          value={String(selectCoffee.price)}
          onChange={(e) =>
            setSelectCoffee({
              ...selectCoffee,
              price: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["コンビニ", "店舗"]}
          placeholder="場所"
          label="場所"
          value={String(selectCoffee.place)}
          onChange={(e) =>
            setSelectCoffee({
              ...selectCoffee,
              place: String(e),
            })
          }
        />
        <Button color="cyan" type="submit">
          気分で飲む
        </Button>
      </form>

      <div>
        {bestfeelingData?.length !== 0 && <h3>ベストコーヒー</h3>}
        {bestfeelingData?.map((coffee) => (
          <div key={coffee.id}>
            <h4>{coffee.name}</h4>
            {coffee.image !== null && (
              <img css={imgCoffee} src={coffee.image} alt="画像" />
            )}
          </div>
        ))}

        {bestBitterCoffeeData !== undefined && <h3>苦味ベストコーヒー</h3>}
        {bestBitterCoffeeData?.map((coffee) => (
          <div key={coffee.id}>
            <h4>{coffee.name}</h4>
            {coffee.image !== null && (
              <img css={imgCoffee} src={coffee.image} alt="画像" />
            )}
          </div>
        ))}

        {bestAcidityCoffeeData !== undefined && <h3>酸味ベストコーヒー</h3>}
        {bestAcidityCoffeeData?.map((coffee) => (
          <div key={coffee.id}>
            <h4>{coffee.name}</h4>
            {coffee.image !== null && (
              <img css={imgCoffee} src={coffee.image} alt="画像" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feeling;

const feelingBox = css`
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
  border: 1px solid #aaa;

  h2 {
    text-align: center;
  }
`;

const imgCoffee = css`
  width: 50%;
  max-width: 500px;
`;
