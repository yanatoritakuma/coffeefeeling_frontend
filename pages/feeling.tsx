import React, { useState, FormEvent } from "react";
import { useQueryCoffees } from "../hooks/useQueryCoffees";
import { Button, Loader } from "@mantine/core";
import { css } from "@emotion/react";
import { Select } from "@mantine/core";
import { useQueryFeelingCoffees } from "../hooks/useQueryFeelingCoffees";
import { AxiosRequestConfig } from "axios";

const Feeling = () => {
  const { data: coffees, status } = useQueryCoffees();
  // if (status === "loading") return <Loader my="lg" color="cyan" />;

  const [selectCoffee, setSelectCoffee] = useState({
    category: "ブラック",
    bitter: 0,
    acidity: 0,
    amount: 0,
    price: 100,
    place: "",
  });

  const requestParam: AxiosRequestConfig = {
    data: {
      category: selectCoffee.category,
      bitter: selectCoffee.bitter,
      acidity: selectCoffee.acidity,
      amount: selectCoffee.amount,
      price: selectCoffee.price,
      place: selectCoffee.place,
    },
  };

  const { getFeelingCoffees, feelingData } = useQueryFeelingCoffees();

  const onClickSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getFeelingCoffees(requestParam);
    setSelectCoffee({
      category: "ブラック",
      bitter: 0,
      acidity: 0,
      amount: 0,
      price: 100,
      place: "",
    });
  };

  console.log("feelingData", feelingData);

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
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          placeholder="量"
          label="量"
          value={String(selectCoffee.amount)}
          onChange={(e) =>
            setSelectCoffee({
              ...selectCoffee,
              amount: Number(e),
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

      {coffees?.map((coffee) => (
        <div key={coffee.id}>
          <h2>{coffee.name}</h2>
        </div>
      ))}
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
