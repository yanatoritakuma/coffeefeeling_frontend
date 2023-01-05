import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import CoffeeDetail from "../../components/common/CoffeeDetail";
import { useQueryCoffeeSearch } from "../../hooks/useQueryCoffeeSearch";
import { CircularProgress } from "@mui/material";
import { PaginationBox } from "../../components/common/PaginationBox";

const SearchResults = () => {
  const router = useRouter();

  const [transmission, setTransmission] = useState(false);

  const [nowPage, setNowPage] = useState(1);

  const coffeeSearchReq = {
    name: String(router.query.name),
    category: String(router.query.category),
    price: String(router.query.price),
    place: String(router.query.place),
  };

  const { status, data, refetch } = useQueryCoffeeSearch(coffeeSearchReq);

  // 総ページ数
  const totalNumber = data !== undefined ? Math.ceil(data.length / 10) : 0;
  // 現在開いているページのコーヒー
  const openPageData = data?.slice((nowPage - 1) * 10, nowPage * 10);

  // ページ移動したら画面TOPに戻す
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [nowPage]);

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
        {data?.length !== 0 ? (
          <>
            <div css={coffeeDetailBox}>
              <CoffeeDetail coffees={openPageData} setTransmission={setTransmission} />
            </div>
            <div css={paginationBox}>
              <PaginationBox count={totalNumber} nowPage={nowPage} setNowPage={setNowPage} />
            </div>
          </>
        ) : (
          <h3>
            検索結果が0件です。
            <br />
            別の指定で検索してください。
          </h3>
        )}
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
  width: 100%;
  min-height: 100vh;

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

  h3 {
    font-size: 26px;
    color: #fff;
    text-align: center;
    line-height: 1.5em;

    @media screen and (max-width: 425px) {
      font-size: 20px;
    }
  }
`;

const coffeeDetailBox = css`
  margin: 0 auto;
  max-width: 800px;
`;

const paginationBox = css`
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  width: fit-content;
`;
