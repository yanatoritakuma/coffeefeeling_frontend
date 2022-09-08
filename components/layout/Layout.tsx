import { css } from "@emotion/react";
import { memo, ReactNode, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useQueryUser } from "../../hooks/useQueryUser";
import { useLogout } from "../../hooks/useLogout";
import { LogoutIcon } from "@heroicons/react/solid";
import { LoginIcon } from "@heroicons/react/solid";
import { MenuIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";

type Props = {
  children: ReactNode;
};

export const Layout = memo((props: Props) => {
  const { children } = props;
  const { data: user } = useQueryUser();
  const { logout } = useLogout();

  const [hamFlag, setHamFlag] = useState(false);

  return (
    <div>
      <Head>
        <title>CoffeeFeeling</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <header css={headerBox}>
        <Image src={logo} alt="ロゴ" width={60} height={60} />
        <div css={linkBox}>
          <Link href="/">トップページ</Link>
          {!user?.id && (
            <Link href="login">
              <LoginIcon className="login" />
            </Link>
          )}
          {user?.id && <LogoutIcon onClick={logout} className="logout" />}
          {user?.id && <Link href="myPage">マイページ</Link>}
          {user?.admin && <Link href="register">登録</Link>}
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
              <Link href="login">
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
            {user?.id && <Link href="myPage">マイページ</Link>}
            {user?.admin && <Link href="register">登録</Link>}
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
});

const headerBox = css`
  margin: 0 auto;
  padding: 12px;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
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

const linkBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
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
