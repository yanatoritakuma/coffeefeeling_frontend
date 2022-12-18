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
import { MenuBox } from "../components/common/MenuBox";
import { ProfileChange } from "../components/dialog/ProfileChange";
import AccountDelete from "../components/dialog/AccountDelete";
import { PaginationBox } from "../components/common/PaginationBox";
import { useQueryLoginUserLikesCoffee } from "../hooks/useQueryLoginUserLikesCoffee";
import { useQueryGetUserLiked } from "../hooks/useQueryGetUserLiked";

const MyPage = () => {
  const { data: user } = useQueryUser();

  // 現在投稿のページ
  const [nowPostPage, setPostNowPage] = useState(1);
  const skipPostPage = nowPostPage * 10 - 10;
  const takePostPage = skipPostPage + 10;
  // 現在いいねのページ
  const [nowLikePage, setLikeNowPage] = useState(1);
  const skipLikePage = nowLikePage * 10 - 10;
  const takeLikePage = skipLikePage + 10;

  // 特定のユーザー（ログインユーザー）が投稿したコーヒー
  const { data: userCoffees, refetch: refetchUserCoffees } = useQueryGetUserCoffee(
    skipPostPage,
    takePostPage
  );

  // ログインユーザーがいいねしたコーヒー
  const { data: loginUserLikesCoffee, refetch: refetchLoginUserLikesCoffee } =
    useQueryLoginUserLikesCoffee(skipLikePage, takeLikePage);

  // ログインユーザーがいいね済みを取得
  const { data: getUserLiked, refetch: refetchGetUserLiked } = useQueryGetUserLiked();

  //投稿した全ページ数
  const paginationPostCount =
    userCoffees !== undefined ? Math.ceil(userCoffees[0]?.user?._count.coffee / 10) : 0;
  // いいねの全ページ数
  const paginationLikeCount = getUserLiked !== undefined ? Math.ceil(getUserLiked.length / 10) : 0;

  // ページ移動したら画面TOPに戻す
  useEffect(() => {
    refetchUserCoffees();
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }, [nowPostPage]);

  // ページ移動したら画面TOPに戻す
  useEffect(() => {
    refetchLoginUserLikesCoffee();
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }, [nowLikePage]);

  const [tabValue, setTabValue] = useState("post");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [transmission, setTransmission] = useState(false);

  const onClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const [selectMenu, setSelectMenu] = useState(-1);

  const [settingFlag, setSettingFlag] = useState({
    profile: false,
    accountDelete: false,
  });

  useEffect(() => {
    if (selectMenu === 0) {
      setSettingFlag({
        ...settingFlag,
        profile: true,
      });
    } else if (selectMenu === 1) {
      setSettingFlag({
        ...settingFlag,
        accountDelete: true,
      });
    }
  }, [selectMenu]);

  useEffect(() => {
    setSelectMenu(-1);
  }, [settingFlag]);

  // いいねした場合APIを叩く
  const refetchSetTime = () => {
    refetchUserCoffees();
    refetchLoginUserLikesCoffee();
    refetchGetUserLiked();
  };

  useEffect(() => {
    setTimeout(refetchSetTime, 1000);
    setTransmission(false);
  }, [transmission, tabValue]);

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
            <span>
              {userCoffees?.length !== 0 && userCoffees !== undefined
                ? userCoffees[0]?.user?._count.coffee
                : 0}
            </span>
            <span>投稿</span>
          </div>
          <div css={imgRightBox}>
            <span>
              {getUserLiked?.length !== 0 && getUserLiked !== undefined ? getUserLiked.length : 0}
            </span>
            <span>いいね</span>
          </div>
        </div>
        <h3>{user?.name}</h3>
        <div css={tabBox}>
          <div css={tabListBox}>
            <span onClick={() => setTabValue("post")}>
              <FontAwesomeIcon
                icon={faMugSaucer}
                style={tabValue === "post" ? { color: "#7b5544" } : { color: "#bcc7d7" }}
              />
            </span>
            <span onClick={() => setTabValue("like")}>
              <FontAwesomeIcon
                icon={faHeart}
                style={tabValue === "like" ? { color: "#e73562" } : { color: "#bcc7d7" }}
              />
            </span>
          </div>
          <div css={contentsBox}>
            {tabValue === "post" && (
              <div>
                {userCoffees !== undefined && userCoffees?.length > 0 ? (
                  <CoffeeDetail coffees={userCoffees} setTransmission={setTransmission} />
                ) : (
                  <p>まだ投稿がありません</p>
                )}
              </div>
            )}
            {tabValue === "like" && (
              <div>
                {loginUserLikesCoffee !== undefined && loginUserLikesCoffee?.length > 0 ? (
                  <CoffeeDetail coffees={loginUserLikesCoffee} setTransmission={setTransmission} />
                ) : (
                  <p>まだいいねがありません</p>
                )}
              </div>
            )}
            {tabValue === "post" ? (
              <div css={paginationBox}>
                <PaginationBox
                  nowPage={nowPostPage}
                  setNowPage={setPostNowPage}
                  count={paginationPostCount}
                />
              </div>
            ) : (
              <div css={paginationBox}>
                <PaginationBox
                  nowPage={nowLikePage}
                  setNowPage={setLikeNowPage}
                  count={paginationLikeCount}
                />
              </div>
            )}
          </div>
        </div>
        <FontAwesomeIcon icon={faGear} css={settingIcon} onClick={(e: any) => onClickMenu(e)} />
        <MenuBox
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          menuItemArray={["プロフィール変更", "アカウント削除"]}
          setSelectMenu={setSelectMenu}
        />
        <ProfileChange
          open={settingFlag.profile}
          onClose={() =>
            setSettingFlag({
              ...settingFlag,
              profile: false,
            })
          }
        />
        <AccountDelete
          open={settingFlag.accountDelete}
          onClose={() =>
            setSettingFlag({
              ...settingFlag,
              accountDelete: false,
            })
          }
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

const paginationBox = css`
  ul {
    margin: 0 auto;
    width: fit-content;
  }
`;
