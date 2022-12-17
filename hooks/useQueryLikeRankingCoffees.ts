import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TCoffeeUser } from "../types/coffee";

export const useQueryLikeRankingCoffees = () => {
  const router = useRouter();
  const getLikeRankingCoffees = async () => {
    const { data } = await axios.get<TCoffeeUser[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/likeRankingCoffees`
    );
    return data;
  };
  return useQuery<TCoffeeUser[], Error>({
    queryKey: ["likeRankingCoffees"],
    queryFn: getLikeRankingCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
