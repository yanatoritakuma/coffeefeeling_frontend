import { css } from "@emotion/react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import TopImg from "../public/coffeeTop.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  return (
    <section css={topBox}>
      <Image src={TopImg} layout="fill" css={topImg} alt="topImage" />
      <h1>CoffeFeeling</h1>
      <Link href="/feeling">
        <div css={linkBox}>
          今の気分で選ぶ
          <FontAwesomeIcon icon={faMugHot} />
        </div>
      </Link>
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
`;

const topImg = css`
  object-fit: cover;
`;

const linkBox = css`
  position: absolute;
  top: 60%;
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
