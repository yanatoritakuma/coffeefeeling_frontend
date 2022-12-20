import React from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import TopImg from "../../public/coffeeTop.jpg";
import coffeeTop from "../../public/coffeeTopIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TopImage = () => {
  return (
    <section css={topBox}>
      <span css={filter}></span>
      <Image src={TopImg} layout="fill" css={topImg} alt="topImage" />
      <div css={topBoxIn}>
        <h1>CoffeFeeling</h1>
        <div className="topBoxIn__icon">
          <Image src={coffeeTop} layout="fill" css={topImg} alt="coffeeIcon" />
        </div>
        <Link href="/feeling">
          <div css={linkBox}>
            今の気分で選ぶ
            <FontAwesomeIcon icon={faMugHot} />
          </div>
        </Link>
        <Link href="/likeRanking">
          <div css={linkLikeBox}>
            いいねランキング
            <FontAwesomeIcon icon={faCrown} />
          </div>
        </Link>
        <Link href="/">
          <div css={productSearchBox}>
            商品検索
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TopImage;

const topBox = css`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const topImg = css`
  object-fit: cover;
`;

const filter = css`
  background-color: #7b5544;
  opacity: 0.4;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const topBoxIn = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 60px;
    font-family: "Kalam", cursive;

    @media screen and (max-width: 768px) {
      font-size: 42px;
    }
  }

  .topBoxIn__icon {
    position: relative;
    width: 100px;
    height: 100px;
    top: 62%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`;

const linkBox = css`
  position: absolute;
  top: 74%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: fit-content;
  min-width: 190px;
  cursor: pointer;

  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }

  svg {
    margin-left: 12px;
    width: 50px;

    @media screen and (max-width: 768px) {
      width: 30px;
    }
  }
`;

const linkLikeBox = css`
  position: absolute;
  top: 80%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: fit-content;
  min-width: 230px;
  cursor: pointer;

  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  svg {
    margin: 6px 12px 12px 12px;
    width: 40px;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const productSearchBox = css`
  position: absolute;
  top: 86%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: fit-content;
  min-width: 230px;
  cursor: pointer;

  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  svg {
    margin: 6px 12px 12px 12px;
    width: 40px;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
