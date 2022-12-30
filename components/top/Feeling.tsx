import React, { memo, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import topFeeling from "../../public/topFeeling.jpg";
import { ButtonBox } from "../atoms/ButtonBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Feeling = memo(() => {
  const router = useRouter();
  const [scrollAmount, setScrollAmount] = useState(0);
  console.log(scrollAmount);
  const toggleVisibility = () => {
    setScrollAmount(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div css={feelingBox}>
      <div className={scrollAmount > 500 ? "view" : "hidden"}>
        <h2>Feeling</h2>
        <p className="feelingBox__topText">
          あなたの今の気分はなんですか？
          <br />
          今の気分で飲みたいコーヒーを探します。
        </p>
        <div css={imgMainBox}>
          <h4 className="imgMainBox__text">
            Feeling
            <br />
            気分で探す
          </h4>
          <div css={imgBox}>
            <Image src={topFeeling} layout="responsive" alt="topImage" />
          </div>
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
    </div>
  );
});

export default Feeling;

const feelingBox = css`
  margin: 160px auto;
  width: 100%;
  max-width: 1440px;

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

    @media screen and (max-width: 425px) {
      font-size: 16px;
    }
  }

  button {
    margin: 0 auto;
    margin-top: 180px;
    padding: 20px;
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 18px;
    background-color: #7b5544;

    @media screen and (max-width: 425px) {
      font-size: 16px;
    }

    &:hover {
      background-color: #7b5544;
      opacity: 0.7;
    }

    svg {
      width: 30px;
    }
  }

  .view {
    opacity: 1;
    transition: 0.3s;
  }

  .hidden {
    opacity: 0;
    transition: 0.3s;
  }
`;

const imgMainBox = css`
  position: relative;

  .imgMainBox__text {
    writing-mode: vertical-rl;
    position: absolute;
    top: 60px;
    left: 128px;
    font-size: 24px;
    line-height: 1.5em;

    @media screen and (max-width: 768px) {
      margin: 60px auto;
      position: unset;
    }
  }

  .feelingBox__explanation {
    padding: 30px;
    background-color: #7b5544;
    width: 360px;
    height: 220px;
    position: absolute;
    top: 250px;
    right: 422px;
    color: #fff;

    @media screen and (max-width: 1024px) {
      padding: 12px;
      width: 300px;
      height: 196px;
      position: absolute;
      top: 200px;
      right: 422px;
    }

    @media screen and (max-width: 768px) {
      top: 340px;
      left: 0;
      width: 300px;
      height: 200px;
    }

    @media screen and (max-width: 425px) {
      top: 320px;
      width: 250px;
      height: 180px;
    }

    h3 {
      margin: 0;
      margin-bottom: 40px;
      font-weight: normal;
      @media screen and (max-width: 425px) {
        font-size: 16px;
      }
    }

    p {
      font-size: 16px;
      line-height: 2em;
      @media screen and (max-width: 425px) {
        font-size: 14px;
      }
    }
  }
`;

const imgBox = css`
  margin-left: auto;
  width: 46%;
  min-width: 500px;
  position: relative;

  @media screen and (max-width: 768px) {
    min-width: 400px;
  }

  @media screen and (max-width: 425px) {
    min-width: 300px;
  }

  img {
    object-fit: cover;
  }
`;
