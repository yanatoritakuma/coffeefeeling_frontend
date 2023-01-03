import React from "react";
import axios from "axios";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { TCoffeeUser } from "../types/coffee";

type TCoffeeSearch = {
  name: string;
  category: string;
  price: string;
  place: string;
};

export const useQueryCoffeeSearch = (coffeeSearch?: TCoffeeSearch) => {
  const router = useRouter();

  const name = coffeeSearch && JSON.stringify(coffeeSearch.name);
  const category = coffeeSearch && JSON.stringify(coffeeSearch.category);
  const price = coffeeSearch && JSON.stringify(coffeeSearch.price);
  const place = coffeeSearch && JSON.stringify(coffeeSearch.place);

  const getSearchCoffee = async () => {
    const { data } = await axios.get<TCoffeeUser[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/searchCoffee?name=${name}&category=${category}&price=${price}&place=${place}`
    );
    return data;
  };
  return useQuery<TCoffeeUser[], Error>({
    queryKey: ["searchCoffee"],
    queryFn: getSearchCoffee,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push("/");
    },
  });
};
