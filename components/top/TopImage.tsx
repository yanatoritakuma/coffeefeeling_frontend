import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import TopImg from "../../public/coffeeTop.jpg";
import coffeeTop from "../../public/coffeeTopIcon.png";

const TopImage = () => {
  return (
    <section css={topBox}>
      <span css={filter}></span>
      <Image src={TopImg} layout="fill" css={topImg} alt="topImage" />
      <div css={topBoxIn}>
        <h1>CoffeeFeeling</h1>
        <div className="topBoxIn__icon">
          <Image src={coffeeTop} layout="fill" css={topImg} alt="coffeeIcon" />
        </div>
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
