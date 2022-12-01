import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Likes } from "@prisma/client";

type TCoffeeIds = {
  coffeeId1: number;
  coffeeId2: number;
  coffeeId3: number;
  coffeeId4: number;
  coffeeId5: number;
  coffeeId6: number;
  coffeeId7: number;
  coffeeId8: number;
  coffeeId9: number;
  coffeeId10: number;
};

export const useQueryCoffeeIdLikes = (coffeeIds: TCoffeeIds) => {
  const router = useRouter();

  const getCoffeeIdLikes = async () => {
    const { data } = await axios.get<Likes[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/coffeeIds?coffeeId1=${coffeeIds.coffeeId1}&coffeeId2=${coffeeIds.coffeeId2}&coffeeId3=${coffeeIds.coffeeId3}&coffeeId4=${coffeeIds.coffeeId4}&coffeeId5=${coffeeIds.coffeeId5}&coffeeId6=${coffeeIds.coffeeId6}&coffeeId7=${coffeeIds.coffeeId7}&coffeeId8=${coffeeIds.coffeeId8}&coffeeId9=${coffeeIds.coffeeId9}&coffeeId10=${coffeeIds.coffeeId10}`
    );
    return data;
  };

  return useQuery<Likes[], Error>({
    queryKey: ["coffeeIdLikes"],
    queryFn: getCoffeeIdLikes,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
