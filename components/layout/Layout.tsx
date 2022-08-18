import { css } from "@emotion/react";
import { memo, ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export const Layout = memo((props: Props) => {
  const { children } = props;
  return (
    <div>
      <Head>
        <title>CoffeeFeeling</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <header css={headerBox}>
        <Image src={logo} alt="ロゴ" width={60} height={60} />
        <div>
          <Link href="/">トップページ</Link>
          <Link href="login">ログイン</Link>
        </div>
      </header>
      <main css={mainBox}>{children}</main>
    </div>
  );
});

const headerBox = css`
  margin: 0 auto;
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
`;

const mainBox = css`
  margin: 0 auto;
  padding: 12px;
  max-width: 1200px;
`;
