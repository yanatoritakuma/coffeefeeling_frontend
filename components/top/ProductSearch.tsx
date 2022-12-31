import React, { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import productSearch1 from "../../public/productSearch1.jpg";
import productSearch2 from "../../public/productSearch2.jpg";
import productSearch3 from "../../public/productSearch3.jpg";
import { ButtonBox } from "../atoms/ButtonBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ProductSearch = memo(() => {
  const router = useRouter();
  const imageArray = [productSearch1, productSearch2, productSearch3];

  const [scrollAmount, setScrollAmount] = useState(0);

  const toggleVisibility = () => {
    setScrollAmount(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div css={productSearchBox}>
      <div className={scrollAmount > 2800 ? "view" : "hidden"}>
        <h2>Search</h2>
        <p className="productSearchBox__topText">
          商品名、カテゴリー、値段、購入場所から
          <br />
          コーヒーの検索ができます。
        </p>
        <div className="productSearchBox__textBox">
          <h4>
            Search
            <br />
            コーヒーを検索
          </h4>
        </div>
        <Swiper
          className="productSearchBox__swiperBox"
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {imageArray.map((img, index) => (
            <SwiperSlide key={index}>
              <div css={imgBox}>
                <Image src={img} layout="fill" alt="topImage" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <ButtonBox onClick={() => router.push("/productSearch")}>
          検索する
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </ButtonBox>
      </div>
    </div>
  );
});

export default ProductSearch;

const productSearchBox = css`
  margin: 120px 0;
  width: 100%;
  position: relative;

  h2 {
    font-size: 60px;
    font-family: "Kalam", cursive;
    text-align: center;
  }

  .productSearchBox__topText {
    margin: 80px 0;
    text-align: center;
    line-height: 2.5em;
    font-size: 18px;

    @media screen and (max-width: 425px) {
      font-size: 16px;
    }
  }

  .productSearchBox__swiperBox {
    width: 60%;
    height: 600px;

    @media screen and (max-width: 1024px) {
      width: 70%;
      height: 500px;
    }

    @media screen and (max-width: 768px) {
      width: 90%;
      height: 400px;
    }

    @media screen and (max-width: 425px) {
      width: 96%;
      height: 200px;
    }
  }

  .productSearchBox__textBox {
    position: absolute;
    top: 340px;
    left: 90px;
    font-size: 24px;
    line-height: 1.5em;

    @media screen and (max-width: 1024px) {
      left: 10px;
    }

    @media screen and (max-width: 768px) {
      margin: 20px auto;
      position: unset;
      width: fit-content;
    }

    h4 {
      writing-mode: vertical-rl;
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
    background-color: #ed7600;

    @media screen and (max-width: 768px) {
      margin-top: 100px;
    }

    @media screen and (max-width: 425px) {
      font-size: 16px;
    }

    &:hover {
      background-color: #ed7600;
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

const imgBox = css`
  width: 100%;

  img {
    object-fit: cover;
  }
`;
