import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type Req = {
  coffeeId: number;
};

export const useMutateLike = () => {
  const createLikeMutation = useMutation(async (Req: Req) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/likes`,
      Req
    );
    return res.data;
  });

  return { createLikeMutation };
};
