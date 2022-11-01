import React from "react";
import { css } from "@emotion/react";
import { useQueryFeelingCoffees } from "../../hooks/useQueryFeelingCoffees";
import { useRouter } from "next/router";
import FeelingCoffeeDetail from "../../components/common/FeelingCoffeeDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from "@fortawesome/free-solid-svg-icons";

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

  const { status, data, error } = useQueryFeelingCoffees(feelingReq);

  return (
    <section css={feelNowBox}>
      {data?.bitterBest?.length !== 0 && data?.acidityBest?.length !== 0 ? (
        <>
          <h2>今の気分</h2>
          <div css={feelNowListBox}>
            <p>
              <span className="feelNowListBox__label">カテゴリー</span>：
              <span className="feelNowListBox__text">
                {router.query.category}
              </span>
            </p>
            <p>
              <span className="feelNowListBox__label">
                苦味
                <FontAwesomeIcon icon={faFaceFrown} className="bitterIcon" />
              </span>
              ：
              <span className="feelNowListBox__text">
                {router.query.bitter}
              </span>
            </p>
            <p>
              <span className="feelNowListBox__label">
                酸味
                <FontAwesomeIcon
                  icon={faFaceGrinTongue}
                  className="acidityIcon"
                />
              </span>
              ：
              <span className="feelNowListBox__text">
                {router.query.acidity}
              </span>
            </p>
            <p>
              <span className="feelNowListBox__label">値段</span>：
              <span className="feelNowListBox__text">{router.query.price}</span>
            </p>
            <p>
              <span className="feelNowListBox__label">場所</span>：
              <span className="feelNowListBox__text">{router.query.place}</span>
            </p>
          </div>
          <FeelingCoffeeDetail bestCoffee={data} />
        </>
      ) : (
        <h2>現在表示できるコーヒーがありません。</h2>
      )}
    </section>
  );
};

export default FeelNow;

const feelNowBox = css`
  padding: 20px 0;
  background-color: #ffedab;
  width: 100%;
  height: 100%;

  h2 {
    color: #7b5544;
    text-align: center;
    font-size: 28px;
  }
`;

const feelNowListBox = css`
  p {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .feelNowListBox__text {
    margin-left: 12px;
    font-weight: bold;
    width: 150px;
  }

  .feelNowListBox__label {
    display: block;
    width: 106px;
  }

  .bitterIcon {
    margin: 0 12px;
    color: #24140e;
    width: 24px;
    height: 24px;

    @media screen and (max-width: 1024px) {
      width: 18px;
      height: 18px;
    }
  }

  .acidityIcon {
    margin: 0 12px;
    color: #9fc24d;
    width: 24px;
    height: 24px;

    @media screen and (max-width: 1024px) {
      width: 18px;
      height: 18px;
    }
  }
`;
