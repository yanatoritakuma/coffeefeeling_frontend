import React, { useState } from "react";
import { css } from "@emotion/react";
import { useQueryUser } from "../hooks/useQueryUser";
import Image from "next/image";
import UserImg from "../public/user.png";
import { useQueryGetUserCoffee } from "../hooks/useQueryGetUserCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import CoffeeDetail from "../components/common/CoffeeDetail";
import { useQueryLikes } from "../hooks/useQueryLikes";
import { useQueryCoffees } from "../hooks/useQueryCoffees";

const MyPage = () => {
  const { data: user } = useQueryUser();
  const { data: likes } = useQueryLikes();
  const { data: coffees } = useQueryCoffees();
  const { data: userCoffees } = useQueryGetUserCoffee();

  const [tabValue, setTabValue] = useState("post");

  // LikesDBからログインしているユーザーがいいねした全てを取得
  const likeUser = likes?.filter((like) => like.userId === user?.id);

  // LikesDBからログインしているユーザーがいいね済みcoffeeIdを取得
  const likeUserCoffeeId = likeUser?.map((coffee) => {
    return coffee.coffeeId;
  });

  // ログインしているユーザーがいいね済みcoffee取得
  const coffeeLikes = coffees?.filter(
    (coffee) => likeUserCoffeeId?.indexOf(coffee.id) !== -1
  );

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
        <div css={tabBox}>
          <div css={tabListBox}>
            <span onClick={() => setTabValue("post")}>
              <FontAwesomeIcon
                icon={faMugSaucer}
                style={
                  tabValue === "post"
                    ? { color: "#7b5544" }
                    : { color: "#bcc7d7" }
                }
              />
            </span>
            <span onClick={() => setTabValue("like")}>
              <FontAwesomeIcon
                icon={faHeart}
                style={
                  tabValue === "like"
                    ? { color: "#e73562" }
                    : { color: "#bcc7d7" }
                }
              />
            </span>
          </div>
          <div css={contentsBox}>
            {tabValue === "post" && (
              <div>
                <h4 className="contetsTitle">投稿記事</h4>
                <CoffeeDetail coffees={userCoffees} />
              </div>
            )}
            {tabValue === "like" && (
              <div>
                <CoffeeDetail coffees={coffeeLikes} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPage;

const myPageMainBox = css`
  padding: 30px 10px;
  width: 100%;
  height: 100%;
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

const tabBox = css``;

const tabListBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    padding: 12px;
    width: 46%;
    display: block;
    text-align: center;
    border: 1px solid #333;
    border-bottom: none;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

const contentsBox = css`
  padding: 20px;
  border: 1px solid #333;

  .contetsTitle {
    text-align: center;
    font-size: 21px;
  }
`;
