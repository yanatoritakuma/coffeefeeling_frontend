import type { NextPage } from "next";
import TopImage from "../components/top/TopImage";
import Feeling from "../components/top/Feeling";
import LikeRanking from "../components/top/LikeRanking";

const Home: NextPage = () => {
  return (
    <main>
      <TopImage />
      <Feeling />
      <LikeRanking />
    </main>
  );
};

export default Home;
