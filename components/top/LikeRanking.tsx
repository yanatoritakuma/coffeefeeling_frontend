import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import likeRanking from "../../public/likeRanking.jpg";
import { ButtonBox } from "../atoms/ButtonBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const LikeRanking = () => {
  const router = useRouter();
  const [scrollAmount, setScrollAmount] = useState(0);

  const toggleVisibility = () => {
    setScrollAmount(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div css={likeRankingBox}>
      <div className={scrollAmount > 1600 ? "view" : "hidden"}>
        <h2>LikeRanking</h2>
        <p className="likeRankingBox__topText">
          人気のコーヒーを見ることができます。
          <br />
          いいね数TOP10を選出しています。
        </p>
        <div css={imgMainBox}>
          <h4 className="imgMainBox__text">
            LikeRanking
            <br />
            人気のコーヒー
          </h4>
          <div css={imgBox}>
            <Image src={likeRanking} layout="responsive" alt="likeRanking" />
          </div>
          <div className="likeRankingBox__explanation">
            <h3>今人気のコーヒーを</h3>
            <p>いいね数のTOP10のコーヒーを見ることができます。</p>
          </div>
        </div>
        <ButtonBox onClick={() => router.push("/likeRanking")}>
          ランキングを見る
          <FontAwesomeIcon icon={faCrown} />
        </ButtonBox>
      </div>
    </div>
  );
};

export default LikeRanking;

const likeRankingBox = css`
  margin: 160px auto;
  width: 100%;
  max-width: 1440px;

  h2 {
    font-size: 60px;
    font-family: "Kalam", cursive;
    text-align: center;
  }

  .likeRankingBox__topText {
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
    width: 260px;
    font-size: 18px;
    background-color: #fcc800;

    @media screen and (max-width: 425px) {
      font-size: 16px;
    }

    &:hover {
      background-color: #fcc800;
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
    top: 12px;
    right: 128px;
    font-size: 24px;
    line-height: 1.5em;

    @media screen and (max-width: 768px) {
      margin: 60px auto;
      position: unset;
    }
  }

  .likeRankingBox__explanation {
    padding: 30px;
    background-color: #fcc800;
    width: 360px;
    height: 220px;
    position: absolute;
    top: 250px;
    left: 422px;
    color: #fff;

    @media screen and (max-width: 1024px) {
      padding: 12px;
      width: 300px;
      height: 196px;
      position: absolute;
      top: 200px;
      left: 422px;
    }

    @media screen and (max-width: 768px) {
      top: 340px;
      left: unset;
      right: 0;
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
  margin-right: auto;
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
