import React, { useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "../components/atoms/TextBox";
import { SelectBox } from "../components/atoms/SelectBox";
import { ButtonBox } from "../components/atoms/ButtonBox";

const ProductSearch = () => {
  const [searchState, setSearchState] = useState({
    name: "",
    category: "",
    price: 100,
    place: "",
  });

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
              value={String(searchState.price)}
              onChange={(e) =>
                setSearchState({
                  ...searchState,
                  price: Number(e.target.value),
                })
              }
              label="値段"
              menuItems={["100", "300", "500", "700", "1000"]}
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
              menuItems={["コンビニ", "店舗"]}
            />
          </div>
          <ButtonBox>検索</ButtonBox>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;

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
      text-align: center;
      color: #fff;
      font-size: 20px;
    }
  }
`;

const searchBox = css`
  margin: 30px auto;
  padding: 20px;
  width: 60%;
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
  }
`;
