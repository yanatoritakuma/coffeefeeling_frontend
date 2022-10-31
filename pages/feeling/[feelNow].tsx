import React from "react";
import { css } from "@emotion/react";
import { useQueryFeelingCoffees } from "../../hooks/useQueryFeelingCoffees";
import { useRouter } from "next/router";
import FeelingCoffeeDetail from "../../components/common/FeelingCoffeeDetail";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { feelNow: "black" } },
      { params: { feelNow: "latte" } },
      { params: { feelNow: "espresso" } },
      { params: { feelNow: "mocha" } },
      { params: { feelNow: "cafeAuLait" } },
      { params: { feelNow: "cappuccino" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = async (context: {
  params: { feelNow: string };
}) => {
  const { feelNow } = context.params;
  return {
    props: { feelNow },
  };
};

const FeelNow = () => {
  const router = useRouter();

  const feelingReq = {
    category: String(router.query.category),
    bitter: Number(router.query.bitter),
    acidity: Number(router.query.acidity),
    price: Number(router.query.price),
    place: String(router.query.place),
  };

  const { status, data, error, refetch } = useQueryFeelingCoffees(feelingReq);

  return (
    <section>
      {data?.bitterBest?.length !== 0 && data?.acidityBest?.length !== 0 ? (
        <>
          <h2>今の気分</h2>
          <FeelingCoffeeDetail bestCoffee={data} />
        </>
      ) : (
        <h2>現在表示できるコーヒーがありません。</h2>
      )}
    </section>
  );
};

export default FeelNow;
