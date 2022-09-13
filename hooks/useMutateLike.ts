import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Likes } from "@prisma/client";
import { useRouter } from "next/router";

type Req = {
  coffeeId: number;
};

export const useMutateLike = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createLikeMutation = useMutation(
    async (Req: Req) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/likes`,
        Req
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Likes[]>(["likes"]);
        if (previousTodos) {
          queryClient.setQueryData(["likes"], [res, ...previousTodos]);
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  return { createLikeMutation };
};
