import React, { useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "../components/atoms/TextBox";
import { SelectBox } from "../components/atoms/SelectBox";
import { ButtonBox } from "../components/atoms/ButtonBox";
import { useRouter } from "next/router";

const CoffeeSearch = () => {
  const router = useRouter();

  const [searchState, setSearchState] = useState({
    name: "",
    category: "指定なし",
    price: "指定なし",
    place: "指定なし",
  });

  const onClickSearch = () => {
    if (
      searchState.name === "" &&
      searchState.category === "指定なし" &&
      searchState.price === "指定なし" &&
      searchState.place === "指定なし"
    ) {
      return alert("1つ以上の検索条件が必須です。");
    }
    router.push({ pathname: `/coffeeSearch/searchResults`, query: searchState });
  };

  return (
    <div css={productSearchBox}>
      <div className="productSearchBox__box">
        <h2>Search</h2>
        <p className="productSearchBox__text">
          商品名、カテゴリー、値段、購入場所から コーヒーの検索ができます。
        </p>
        <div css={searchBox}>
          <div className="searchBox__inputBox">
            <TextBox
              label="商品名"
              value={searchState.name}
              onChange={(e) =>
                setSearchState({
                  ...searchState,
                  name: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="searchBox__inputBox">
            <SelectBox
              value={searchState.category}
              onChange={(e) =>
                setSearchState({
                  ...searchState,
                  category: e.target.value,
                })
              }
              label="カテゴリー"
              menuItems={[
                "指定なし",
                "ブラック",
                "カフェラテ",
                "エスプレッソ",
                "カフェモカ",
                "カフェオレ",
                "カプチーノ",
              ]}
            />
          </div>
          <div className="searchBox__inputBox">
            <SelectBox
              value={searchState.price}
              onChange={(e) =>
                setSearchState({
                  ...searchState,
                  price: e.target.value,
                })
              }
              label="値段"
              menuItems={["指定なし", "100", "300", "500", "700", "1000"]}
            />
          </div>
          <div className="searchBox__inputBox">
            <SelectBox
              value={searchState.place}
              onChange={(e) =>
                setSearchState({
                  ...searchState,
                  place: e.target.value,
                })
              }
              label="場所"
              menuItems={["指定なし", "コンビニ", "店舗"]}
            />
          </div>
          <ButtonBox onClick={() => onClickSearch()}>検索</ButtonBox>
        </div>
      </div>
    </div>
  );
};

export default CoffeeSearch;

const productSearchBox = css`
  background-color: #ed7600;
  width: 100%;
  height: 100vh;

  .productSearchBox__box {
    padding: 120px 0;
    h2 {
      font-size: 60px;
      font-family: "Kalam", cursive;
      color: #fff;
      text-align: center;
    }

    .productSearchBox__text {
      padding: 12px;
      text-align: center;
      color: #fff;
      font-size: 20px;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
`;

const searchBox = css`
  margin: 30px auto;
  padding: 20px;
  width: 90%;
  max-width: 800px;
  min-width: 300px;
  background-color: #fff;
  border-radius: 10px;

  .searchBox__inputBox {
    margin: 26px 0;
  }

  button {
    margin: 0 auto;
    display: block;
    font-size: 18px;
    width: 200px;
    background-color: #ed7600;

    &:hover {
      background-color: #ed7600;
    }
  }
`;
