import { Comments } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

type TCreateCommentReq = {
  text: string;
  coffeeId: number;
};

export const useMutateComment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createCommentsMutation = useMutation(
    async (createCommentReq: TCreateCommentReq) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments`, createCommentReq);
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousComments = queryClient.getQueryData<Comments[]>(["comments"]);
        if (previousComments) {
          queryClient.setQueryData(["comments"], [res, ...previousComments]);
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  const deleteCommentsMutation = useMutation(
    async (id: number) => {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`);
    },
    {
      onSuccess: (_, variables) => {
        const previousComments = queryClient.getQueryData<Comments[]>(["comments"]);
        if (previousComments) {
          queryClient.setQueryData(
            ["comments"],
            previousComments.filter((comment) => comment.id !== variables)
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

  return { createCommentsMutation, deleteCommentsMutation };
};
