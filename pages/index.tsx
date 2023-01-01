import type { NextPage } from "next";
import TopImage from "../components/top/TopImage";
import Feeling from "../components/top/Feeling";
import LikeRanking from "../components/top/LikeRanking";
import CoffeeSearch from "../components/top/CoffeeSearch";

const Home: NextPage = () => {
  return (
    <main>
      <TopImage />
      <Feeling />
      <LikeRanking />
      <CoffeeSearch />
    </main>
  );
};

export default Home;
