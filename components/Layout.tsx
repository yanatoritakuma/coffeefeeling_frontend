import { FC, ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <div>
      <Head>
        <title>CoffeeFeeling</title>
      </Head>
      <main>{children}</main>
    </div>
  );
};
