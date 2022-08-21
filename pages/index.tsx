import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <section>
      <h1>CoffeFeeling</h1>
      <Link href="/feeling">今の気分で選ぶ</Link>
    </section>
  );
};

export default Home;
