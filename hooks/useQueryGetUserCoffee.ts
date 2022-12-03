import React from "react";
import axios from "axios";
import { Coffee } from "@prisma/client";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { TCoffeeUser } from "../types/coffee";

export const useQueryGetUserCoffee = (skipPage: number, takePage: number) => {
  const router = useRouter();
  const getUserCoffees = async () => {
    const { data } = await axios.get<TCoffeeUser[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/userId?skipPage=${skipPage}&takePage=${takePage}`
    );
    return data;
  };
  return useQuery<TCoffeeUser[], Error>({
    queryKey: ["userCoffees"],
    queryFn: getUserCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
