import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Likes } from "@prisma/client";
import { TLoginUserLikesCoffee } from "../types/like";

export const useQueryLoginUserLikesCoffee = (
  skipPage: number,
  takePage: number
) => {
  const router = useRouter();
  const getLoginUserLikesCoffee = async () => {
    const { data } = await axios.get<TLoginUserLikesCoffee[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/login?skipPage=${skipPage}&takePage=${takePage}`
    );
    return data;
  };
  return useQuery<TLoginUserLikesCoffee[], Error>({
    queryKey: ["loginUserLikesCoffee"],
    queryFn: getLoginUserLikesCoffee,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
