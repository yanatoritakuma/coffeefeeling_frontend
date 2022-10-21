import React, { useState } from "react";
import axios from "axios";
import { Coffee } from "@prisma/client";

type TFeeling = {
  category: string;
  bitter: number;
  acidity: number;
  price: number;
  place: string;
};

export const useFeelingCoffees = () => {
  const [feelingData, setFeelingData] = useState<Coffee[]>([]);
  const getFeelingCoffees = async (feeling: TFeeling) => {
    const categoryJson = JSON.stringify(feeling.category);
    const bitterJson = JSON.stringify(feeling.bitter);
    const acidityJson = JSON.stringify(feeling.acidity);
    const priceJson = JSON.stringify(feeling.price);
    const placeJson = JSON.stringify(feeling.place);

    const data = await axios.get<Coffee[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/feeling?category=${categoryJson}
      &bitter=${bitterJson}&acidity=${acidityJson}&price=${priceJson}&place=${placeJson}`
    );

    return setFeelingData(data.data);
  };

  return { getFeelingCoffees, feelingData };
};
