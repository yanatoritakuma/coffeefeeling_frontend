import { css } from "@emotion/react";
import { memo, ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useQueryUser } from "../../hooks/useQueryUser";
import { useLogout } from "../../hooks/useLogout";
import { LogoutIcon } from "@heroicons/react/solid";

type Props = {
  children: ReactNode;
};

export const Layout = memo((props: Props) => {
  const { children } = props;
  const { data: user } = useQueryUser();
  const { logout } = useLogout();

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
          {!user?.id && <Link href="login">ログイン</Link>}
          {user?.id && <LogoutIcon onClick={logout} className="logout" />}
          {user?.id && <Link href="myPage">マイページ</Link>}
          {user?.admin && <Link href="register">登録</Link>}
        </div>
      </header>
      <main css={mainBox}>{children}</main>
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

  .logout {
    width: 10%;
    max-width: 30px;
  }
`;

const mainBox = css`
  margin: 0 auto;
  padding: 12px;
  max-width: 1200px;
`;

const linkBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
