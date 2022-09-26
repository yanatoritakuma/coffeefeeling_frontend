import React from "react";
import { css } from "@emotion/react";
import { CoffeeForm } from "../components/common/CoffeeForm";
import Image from "next/image";
import FormImg from "../public/form.jpg";

const Register = () => {
  return (
    <div css={registerBox}>
      <Image src={FormImg} layout="fill" css={formImg} alt="backgImage" />
      <CoffeeForm />
    </div>
  );
};

export default Register;

const registerBox = css`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const formImg = css`
  object-fit: cover;
`;
