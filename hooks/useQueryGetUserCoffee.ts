import React from "react";
import axios from "axios";
import { Coffee } from "@prisma/client";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetUserCoffee = () => {
  const router = useRouter();
  const getUserCoffees = async () => {
    const { data } = await axios.get<Coffee[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/userId`
    );
    return data;
  };
  return useQuery<Coffee[], Error>({
    queryKey: ["userCoffees"],
    queryFn: getUserCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
