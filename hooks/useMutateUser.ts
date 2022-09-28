import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { EditedUser } from "../types";

export const useMutateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateUserMutation = useMutation(
    async (user: EditedUser) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        user
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousUser = queryClient.getQueryData<User>(["user"]);
        if (previousUser) {
          queryClient.setQueryData(["user"], previousUser.id === res.id && res);
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  return { updateUserMutation };
};
