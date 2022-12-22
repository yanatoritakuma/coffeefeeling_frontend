import { css } from "@emotion/react";
import { memo, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../../public/coffee.png";
import Link from "next/link";
import { useQueryUser } from "../../hooks/useQueryUser";
import { useLogout } from "../../hooks/useLogout";
import { LogoutIcon } from "@heroicons/react/solid";
import { LoginIcon } from "@heroicons/react/solid";
import { MenuIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/loginUserSlice";

type Props = {
  children: ReactNode;
};

export const Layout = memo((props: Props) => {
  const { children } = props;
  const { data: user } = useQueryUser();
  const { logout } = useLogout();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  const [hamFlag, setHamFlag] = useState(false);

  const [yScrollAmount, setYScrollAmount] = useState(false);

  const toggleVisibility = () => {
    window.scrollY > 500 ? setYScrollAmount(true) : setYScrollAmount(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div css={headerMainBox}>
      <Head>
        <title>CoffeeFeeling</title>
        <link rel="shortcut icon" href="/coffee.png" />
      </Head>
      <header css={headerBox} className={yScrollAmount ? "active" : "inactive"}>
        <div css={logoBox}>
          <Image src={logo} alt="ロゴ" layout="fill" />
        </div>
        <div css={linkBox}>
          <Link href="/">トップページ</Link>
          {!user?.id && (
            <Link href="/login">
              <LoginIcon className="login" />
            </Link>
          )}
          {user?.id && <LogoutIcon onClick={logout} className="logout" />}
          {user?.id && <Link href="/myPage">マイページ</Link>}
          {user?.id && <Link href="/register">登録</Link>}
        </div>
        <div css={hamBtn}>
          {!hamFlag ? (
            <MenuIcon className="menuIcon" onClick={() => setHamFlag(true)} />
          ) : (
            <XIcon className="menuIcon" onClick={() => setHamFlag(false)} />
          )}
        </div>
        {hamFlag && (
          <div css={spMenu} onClick={() => setHamFlag(false)}>
            <Link href="/">トップページ</Link>
            {!user?.id && (
              <Link href="/login">
                <div css={linkIconBox}>
                  <LoginIcon className="login" />
                  ログイン
                </div>
              </Link>
            )}
            {user?.id && (
              <>
                <div css={linkIconBox} onClick={logout}>
                  <LogoutIcon className="logout" />
                  ログアウト
                </div>
              </>
            )}
            {user?.id && <Link href="/myPage">マイページ</Link>}
            {user?.id && <Link href="/register">登録</Link>}
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
});

const headerMainBox = css`
  .active {
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 2px 2px 2px #333;
    transition: 0.3s;

    a {
      color: #333;
    }
  }

  .inactive {
    transition: 0.3s;

    a,
    svg {
      color: #fff;
    }
  }
`;

const headerBox = css`
  margin: 0 auto;
  padding: 6px 16px;
  width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 10px;
  left: 50%;
  -ms-transform: translate(-50%, 0%);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  z-index: 10;

  a {
    margin: 0 10px;
    text-decoration: none;
  }

  img {
    border-radius: 50%;
  }

  .login {
    width: 30%;
    max-width: 30px;
  }

  .logout {
    width: 10%;
    max-width: 30px;
  }
`;

const logoBox = css`
  position: relative;
  width: 60px;
  height: 60px;
  text-align: center;
`;

const linkBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }

  svg {
    cursor: pointer;
  }
`;

const hamBtn = css`
  display: none;
  text-align: end;

  @media screen and (max-width: 768px) {
    display: block;
  }

  .menuIcon {
    width: 30%;
    max-width: 120px;
    cursor: pointer;
  }
`;

const spMenu = css`
  background: #2f2f2f;
  padding: 12px;
  position: fixed;
  z-index: 999;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100vh;

  a {
    margin: 12px auto;
    display: block;
    font-size: 18px;
    width: fit-content;
    color: #fff;
  }
`;

const linkIconBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  svg {
    margin-right: 6px;
  }
`;
