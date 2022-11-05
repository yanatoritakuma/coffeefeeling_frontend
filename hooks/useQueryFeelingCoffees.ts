import React from "react";
import axios from "axios";
import { Coffee } from "@prisma/client";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

type TFeeling = {
  category: string;
  bitter: number;
  acidity: number;
  price: number;
  place: string;
};

export type TBestCoffee = {
  acidityBest: Coffee[];
  bitterBest: any[];
};

export const useQueryFeelingCoffees = (feeling?: TFeeling) => {
  const router = useRouter();
  const categoryJson = feeling && JSON.stringify(feeling.category);
  const bitterJson = feeling && JSON.stringify(feeling.bitter);
  const acidityJson = feeling && JSON.stringify(feeling.acidity);
  const priceJson = feeling && JSON.stringify(feeling.price);
  const placeJson = feeling && JSON.stringify(feeling.place);

  const getFeelingCoffees = async () => {
    const { data } = await axios.get<TBestCoffee>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/feeling?category=${categoryJson}
      &bitter=${bitterJson}&acidity=${acidityJson}&price=${priceJson}&place=${placeJson}`
    );
    return data;
  };
  return useQuery<TBestCoffee, Error>({
    // enabled: enabled,
    queryKey: ["feelingCoffees"],
    queryFn: getFeelingCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
