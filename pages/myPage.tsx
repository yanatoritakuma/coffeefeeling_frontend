import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useQueryUser } from "../hooks/useQueryUser";
import Image from "next/image";
import UserImg from "../public/user.png";
import { useQueryGetUserCoffee } from "../hooks/useQueryGetUserCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import CoffeeDetail from "../components/common/CoffeeDetail";
import { useQueryLikes } from "../hooks/useQueryLikes";
import { useQueryCoffees } from "../hooks/useQueryCoffees";
import { MenuBox } from "../components/common/MenuBox";
import { ProfileChange } from "../components/common/ProfileChange";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const [selectMenu, setSelectMenu] = useState(-1);

  const [profileFlag, setProfileFlag] = useState(false);

  useEffect(() => {
    selectMenu === 0 && setProfileFlag(true);
  }, [selectMenu]);

  useEffect(() => {
    setSelectMenu(-1);
  }, [profileFlag]);

  return (
    <section css={myPageMainBox}>
      <h2>マイページ</h2>
      <div css={myPageBox}>
        <div css={imgBox}>
          <div css={userImgBox}>
            {user?.image ? (
              <Image src={user?.image} width={100} height={100} alt="userImg" />
            ) : (
              <Image src={UserImg} width={100} height={100} alt="userImg" />
            )}
          </div>
          <div css={imgRightBox}>
            <span>{userCoffees?.length}</span>
            <span>投稿</span>
          </div>
          <div css={imgRightBox}>
            <span>{coffeeLikes?.length}</span>
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
        <FontAwesomeIcon
          icon={faGear}
          css={settingIcon}
          onClick={(e: any) => onClickMenu(e)}
        />
        <MenuBox
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          menuItemArray={["プロフィール変更", "アカウント削除"]}
          setSelectMenu={setSelectMenu}
        />
        <ProfileChange
          open={profileFlag}
          onClose={() => setProfileFlag(false)}
        />
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
  position: relative;

  h3 {
    margin: 12px auto;
    width: 96%;
  }
`;

const settingIcon = css`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  @media screen and (max-width: 425px) {
    width: 24px;
    height: 24px;
    top: 16px;
    right: 16px;
  }
`;

const imgBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  max-width: 360px;
  min-width: 220px;
`;

const userImgBox = css`
  img {
    border-radius: 50%;
  }
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
`;
