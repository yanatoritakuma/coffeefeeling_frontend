import React from "react";
import axios from "axios";
import { Likes } from "@prisma/client";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetUserLiked = () => {
  const router = useRouter();
  const getUserCoffees = async () => {
    const { data } = await axios.get<Likes[]>(`${process.env.NEXT_PUBLIC_API_URL}/likes/userLiked`);
    return data;
  };
  return useQuery<Likes[], Error>({
    queryKey: ["userLiked"],
    queryFn: getUserCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push("/");
    },
  });
};
