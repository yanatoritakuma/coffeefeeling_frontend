import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Likes } from "@prisma/client";

export const useQueryLikes = () => {
  const router = useRouter();
  const getLikes = async () => {
    const { data } = await axios.get<Likes[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/likes`
    );
    return data;
  };
  return useQuery<Likes[], Error>({
    queryKey: ["likes"],
    queryFn: getLikes,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
