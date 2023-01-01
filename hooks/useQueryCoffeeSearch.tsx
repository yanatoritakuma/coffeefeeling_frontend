import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { TBestCoffee } from "../types/coffee";

type TCoffeeSearch = {
  name: string;
};

export const useQueryCoffeeSearch = (coffeeSearch?: TCoffeeSearch) => {
  const router = useRouter();
  const name = coffeeSearch && JSON.stringify(coffeeSearch.name);

  const getSearchCoffee = async () => {
    const { data } = await axios.get<TBestCoffee>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/searchCoffee?name=${name}`
    );
    return data;
  };
  return useQuery<TBestCoffee, Error>({
    queryKey: ["searchCoffee"],
    queryFn: getSearchCoffee,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push("/");
    },
  });
};
