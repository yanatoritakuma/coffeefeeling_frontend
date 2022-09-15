import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Likes } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../providers/Userprovider";

type Req = {
  coffeeId: number;
};

export const useMutateLike = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const context: any = useContext(UserContext);

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

  const deleteLikeMutation = useMutation(
    async (coffeeId: number) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/likes/${coffeeId}`
      );
    },
    {
      onSuccess: (_, variables) => {
        const previousLikes = queryClient.getQueryData<Likes[]>(["likes"]);
        if (previousLikes) {
          queryClient.setQueryData(
            ["likes"],
            previousLikes.filter(
              (like) =>
                like.coffeeId !== variables || like.userId !== context.user?.id
            )
          );
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  return { createLikeMutation, deleteLikeMutation };
};
