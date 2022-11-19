import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TCoffeeUser } from "../types/coffee";

type TCount = {
  _count: {
    likes: number;
  };
};

type TCoffees = TCoffeeUser & TCount;

export const useQueryCoffees = () => {
  const router = useRouter();
  const getCoffees = async () => {
    const { data } = await axios.get<TCoffees[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee`
    );
    return data;
  };
  return useQuery<TCoffees[], Error>({
    queryKey: ["coffees"],
    queryFn: getCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
