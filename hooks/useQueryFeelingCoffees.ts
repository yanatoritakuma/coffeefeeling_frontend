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

export const useQueryFeelingCoffees = (feeling: TFeeling, enabled: boolean) => {
  const router = useRouter();
  const categoryJson = JSON.stringify(feeling.category);
  const bitterJson = JSON.stringify(feeling.bitter);
  const acidityJson = JSON.stringify(feeling.acidity);
  const priceJson = JSON.stringify(feeling.price);
  const placeJson = JSON.stringify(feeling.place);

  const getFeelingCoffees = async () => {
    if (enabled) {
      const { data } = await axios.get<Coffee[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/coffee/feeling?category=${categoryJson}
      &bitter=${bitterJson}&acidity=${acidityJson}&price=${priceJson}&place=${placeJson}`
      );
      return data;
    } else {
      return [];
    }
  };
  return useQuery<Coffee[], Error>({
    // enabled: enabled,
    queryKey: ["coffees"],
    queryFn: getFeelingCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
