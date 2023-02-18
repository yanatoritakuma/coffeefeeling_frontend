import { Comments } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

type TUser = {
  user: {
    name: string;
    image: string;
  };
};

type TComments = Comments & TUser;

export const useQueryComment = (coffeeId: number) => {
  const router = useRouter();

  const coffeeIdJson = JSON.stringify(coffeeId);

  const getComment = async () => {
    const { data } = await axios.get<TComments[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/comments?coffeeId=${coffeeIdJson}`
    );
    return data;
  };

  return useQuery<TComments[], Error>({
    queryKey: ["comments"],
    queryFn: getComment,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push("/");
    },
  });
};
