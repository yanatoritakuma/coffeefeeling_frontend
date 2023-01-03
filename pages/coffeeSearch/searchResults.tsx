import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import CoffeeDetail from "../../components/common/CoffeeDetail";
import { useQueryCoffeeSearch } from "../../hooks/useQueryCoffeeSearch";
import { CircularProgress } from "@mui/material";

const SearchResults = () => {
  const router = useRouter();

  const [transmission, setTransmission] = useState(false);

  const coffeeSearchReq = {
    name: String(router.query.name),
    category: String(router.query.category),
    price: String(router.query.price),
    place: String(router.query.place),
  };

  const { status, data, refetch } = useQueryCoffeeSearch(coffeeSearchReq);

  // いいねした場合APIを叩く
  const refetchSetTime = () => {
    refetch();
  };

  useEffect(() => {
    setTimeout(refetchSetTime, 1000);
    setTransmission(false);
  }, [transmission]);

  return (
    <div css={searchResultsMainBox}>
      <div css={searchResultsBox}>
        <h2>SearchResults</h2>
        <CoffeeDetail coffees={data} setTransmission={setTransmission} />
      </div>
      {status === "loading" && (
        <div className="fileter">
          <CircularProgress size="6rem" />
        </div>
      )}
    </div>
  );
};

export default SearchResults;

const searchResultsMainBox = css`
  background-color: #ed7600;

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

const searchResultsBox = css`
  padding: 120px 0;

  h2 {
    font-size: 60px;
    font-family: "Kalam", cursive;
    color: #fff;
    text-align: center;

    @media screen and (max-width: 425px) {
      font-size: 48px;
    }
  }
`;
