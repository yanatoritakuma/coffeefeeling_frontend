import React from "react";
import { css } from "@emotion/react";

const ProductSearch = () => {
  return (
    <div css={productSearchBox}>
      <div className="productSearchBox__box">
        <h2>Search</h2>
        <h3>開発中</h3>
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
    h2,
    h3 {
      font-size: 60px;
      font-family: "Kalam", cursive;
      color: #fff;
      text-align: center;
    }
  }
`;
