import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TCoffeeUser } from "../types/coffee";

export const useQueryLoginUserLikesCoffee = (
  skipPage: number,
  takePage: number
) => {
  const router = useRouter();
  const getLoginUserLikesCoffee = async () => {
    const { data } = await axios.get<TCoffeeUser[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/likeUserId?skipPage=${skipPage}&takePage=${takePage}`
    );
    return data;
  };
  return useQuery<TCoffeeUser[], Error>({
    queryKey: ["loginUserLikesCoffee"],
    queryFn: getLoginUserLikesCoffee,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
