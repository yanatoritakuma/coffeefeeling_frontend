import { css } from "@emotion/react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import TopImg from "../public/coffeeTop.jpg";

const Home: NextPage = () => {
  return (
    <section css={topBox}>
      <Image
        src={TopImg}
        layout="fill"
        // width={1200}
        // height={900}
        css={topImg}
        alt="topImage"
      />
      <h1>CoffeFeeling</h1>
      <Link href="/feeling">今の気分で選ぶ</Link>
    </section>
  );
};

export default Home;

const topBox = css`
  position: relative;
  width: 100%;
  height: 100vh;

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

    @media screen and (max-width: 768px) {
      font-size: 42px;
    }
  }

  a {
    position: absolute;
    top: 60%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    color: #fff;
    text-decoration: none;
    font-size: 32px;

    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const topImg = css`
  object-fit: cover;
`;
