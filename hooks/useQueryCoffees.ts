import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Coffee } from "@prisma/client";
import { TCoffeeUser } from "../components/common/CoffeeDetail";

type TCount = {
  _count: {
    likes: number;
  };
};

type TCoffees = Coffee & TCount;

export const useQueryCoffees = () => {
  const router = useRouter();
  const getCoffees = async () => {
    const { data } = await axios.get<TCoffeeUser[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee`
    );
    return data;
  };
  return useQuery<TCoffeeUser[], Error>({
    queryKey: ["coffees"],
    queryFn: getCoffees,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
