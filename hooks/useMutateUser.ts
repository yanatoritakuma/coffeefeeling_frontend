import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { EditedUser, DeleteUser } from "../types";
import { deleteImgStorage } from "../utils/deleteImgStorage";

export const useMutateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { deleteImg } = deleteImgStorage();

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

  const deleteUserMutation = useMutation(async (user: DeleteUser) => {
    const ret = window.confirm("本当に削除しますか？");
    if (ret) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/${user.id}`);
      deleteImg(user.image, "userImages");
      queryClient.removeQueries(["user"]);
      alert("削除しました。");
      router.push("/");
    }
  });

  return { updateUserMutation, deleteUserMutation };
};
