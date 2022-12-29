import React, { memo } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import topFeeling from "../../public/topFeeling.jpg";
import { ButtonBox } from "../atoms/ButtonBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Feeling = memo(() => {
  const router = useRouter();

  return (
    <div css={feelingBox}>
      <h2>Feeling</h2>
      <p className="feelingBox__topText">
        あなたの今の気分はなんですか？
        <br />
        今の気分で飲みたいコーヒーを探します。
      </p>
      <div css={imgBox}>
        <Image src={topFeeling} layout="responsive" alt="topImage" />
        <div className="feelingBox__explanation">
          <h3>あなたにマッチするコーヒーを</h3>
          <p>カテゴリー、苦味、酸味、値段、購入場所からお好きなコーヒーを探すことができます。</p>
        </div>
      </div>
      <ButtonBox onClick={() => router.push("/feeling")}>
        今の気分で選ぶ
        <FontAwesomeIcon icon={faMugHot} />
      </ButtonBox>
    </div>
  );
});

export default Feeling;

const feelingBox = css`
  margin: 160px auto;
  width: 100%;
  max-width: 1440px;
  background-color: skyblue;

  h2 {
    font-size: 60px;
    font-family: "Kalam", cursive;
    text-align: center;
  }

  .feelingBox__topText {
    margin: 80px 0;
    text-align: center;
    line-height: 2.5em;
    font-size: 18px;
  }

  button {
    margin: 0 auto;
    margin-top: 160px;
    padding: 20px;
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 18px;
    background-color: #7b5544;

    &:hover {
      background-color: #7b5544;
      opacity: 0.7;
    }

    svg {
      width: 30px;
    }
  }
`;

const imgBox = css`
  margin-left: auto;
  width: 46%;
  position: relative;

  img {
    object-fit: cover;
  }

  .feelingBox__explanation {
    padding: 30px;
    background-color: #7b5544;
    width: 360px;
    height: 260px;
    position: absolute;
    top: 275px;
    left: -150px;
    color: #fff;

    h3 {
      margin: 0;
      margin-bottom: 40px;
      font-weight: normal;
    }

    p {
      font-size: 16px;
      line-height: 2em;
    }
  }
`;
