import React from "react";
import { css } from "@emotion/react";
import { useQueryUser } from "../hooks/useQueryUser";
import Image from "next/image";
import UserImg from "../public/user.png";
import { useQueryGetUserCoffee } from "../hooks/useQueryGetUserCoffee";
import { TabBox } from "../components/organisms/tabBox";

const MyPage = () => {
  const { data: user } = useQueryUser();
  console.log("user", user);

  const { data: userCoffees } = useQueryGetUserCoffee();

  console.log("userCoffees", userCoffees);

  return (
    <section css={myPageMainBox}>
      <h2>マイページ</h2>
      <div css={myPageBox}>
        <div css={imgBox}>
          <div css={userImgBox}>
            <Image src={UserImg} width={100} height={100} alt="userImg" />
          </div>
          <div css={imgRightBox}>
            <span>{userCoffees?.length}</span>
            <span>投稿</span>
          </div>
          <div css={imgRightBox}>
            <span>0</span>
            <span>いいね</span>
          </div>
        </div>
        <h3>{user?.name}</h3>
        <div>
          <TabBox />
        </div>
      </div>
    </section>
  );
};

export default MyPage;

const myPageMainBox = css`
  padding: 30px 10px;
  width: 100%;
  height: 100vh;
  background-color: #ebf6f7;

  h2 {
    text-align: center;
  }
`;

const myPageBox = css`
  margin: 20px auto;
  padding: 10px;
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 10px;
`;

const imgBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;

  @media screen and (max-width: 425px) {
    width: 260px;
  }
`;

const userImgBox = css`
  @media screen and (max-width: 425px) {
    max-width: 80px;
  }
`;

const imgRightBox = css`
  text-align: center;
  span {
    margin: 6px 0;
    display: block;
  }
`;
